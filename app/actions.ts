"use server"

import { redirect } from "next/navigation";
import prisma from "@/app/lib/db"
import { supabase } from "./lib/supabase";
import { revalidatePath } from "next/cache";

export async function createAirbnbHome({ userId }: { userId: string }) {
    const data = await prisma.home.findFirst({
        where: {
            userId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    if (!data) {

        const data = await prisma.home.create({
            data: {
                userId
            }
        })

        return redirect(`/create/${data.id}/structure`)
    } else if (!data.description && !data.category && !data.country) {
        return redirect(`/create/${data.id}/structure`)
    } else if (data.category && !data.description) {
        return redirect(`/create/${data.id}/description`)
    } else if (data.category && data.description && !data.country) {
        return redirect(`/create/${data.id}/address`)
    } else if (data.category && data.description && data.country) {
        const data = await prisma.home.create({
            data: {
                userId
            }
        })

        return redirect(`/create/${data.id}/structure`)
    }
}

export async function saveCategory(
    prevState: { stats: boolean; errors?: { home: string; category: string; }; redirectUrl?: string; } | undefined,
    formData: FormData
) {
    const category = formData.get('category');
    const homeId = formData.get('homeId');

    // Validate input
    if (!homeId || !category) {
        return {
            stats: false,
            errors: {
                home: !homeId ? 'Selected home is required' : '',
                category: !category ? 'Selected category is required' : '',
            }
        };
    }

    try {
        await prisma.home.update({
            where: {
                id: homeId as string
            },
            data: {
                category: category as string
            }
        });

        // Return success with redirect URL instead of calling redirect()
        return {
            stats: true,
            redirectUrl: `/create/${homeId}/description`
        };
    } catch (error) {
        console.error('Error updating category:', error);
        return {
            stats: false,
            errors: {
                home: 'Failed to update home',
                category: 'Failed to update category'
            }
        };
    }
}

// Helper function for retry logic
async function uploadWithRetry(
    bucket: string,
    filename: string,
    file: File,
    contentType: string,
    maxRetries = 3
) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const { data, error } = await supabase.storage
                .from(bucket)
                .upload(filename, file, {
                    cacheControl: '2592000',
                    contentType,
                });

            if (error) throw error;
            return { data, error: null };
        } catch (err) {
            console.log(`Upload attempt ${attempt} failed:`, err);

            if (attempt === maxRetries) {
                return { data: null, error: err };
            }

            // Exponential backoff: wait 1s, 2s, 3s between retries
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
    }
    return { data: null, error: new Error('Max retries exceeded') };
}

export const saveDescription = async (
    prevState: { status: boolean; errors?: { title?: string; description?: string; image?: string; price?: string; }; redirectUrl?: string; } | undefined,
    formData: FormData
) => {

    const homeId = formData.get('homeId') as string;
    const title = formData.get('title') as string;
    const price = formData.get('price') as string;
    const description = formData.get('description') as string;
    const image = formData.get('image') as File;
    const guest = formData.get('guest') as string;
    const bedrooms = formData.get('bedrooms') as string;
    const bathrooms = formData.get('bathrooms') as string;

    console.log('saveDescription', { homeId, title, price, description, imageSize: image?.size, guest, bedrooms, bathrooms })

    // Basic validation
    if (!homeId || typeof homeId !== 'string') {
        return { status: false, errors: { title: 'homeId is required' } };
    }

    if (!title || String(title).trim().length === 0) {
        return { status: false, errors: { title: 'Title field is required' } };
    }

    if (!description || String(description).trim().length === 0) {
        return { status: false, errors: { description: 'Description field is required' } };
    }

    if (!price || parseFloat(price) <= 0) {
        return { status: false, errors: { price: 'Price is invalid' } };
    }

    // Validate image
    if (!image || !(image instanceof File) || !image.type?.startsWith?.('image')) {
        return { status: false, errors: { image: 'Only image files are allowed' } };
    }

    // Check file size (max 5MB)
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (image.size > MAX_FILE_SIZE) {
        return { status: false, errors: { image: 'Image must be less than 5MB' } };
    }

    const contentType = image.type || 'application/octet-stream';
    const filename = `${homeId}/${Date.now()}-${image.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

    try {
        // Upload with retry logic
        const { data: uploadData, error: uploadError } = await uploadWithRetry(
            'airbnb',
            filename,
            image,
            contentType
        );

        if (uploadError || !uploadData) {
            console.error('Supabase upload error:', uploadError);
            return { status: false, errors: { image: 'Image upload failed. Please try again.' } };
        }

        // Get public URL for stored file
        const storagePath = uploadData.path ?? uploadData.fullPath ?? filename;
        const { data: publicData } = supabase.storage.from('airbnb').getPublicUrl(storagePath);
        const publicUrl = publicData?.publicUrl ?? null;

        if (!publicUrl) {
            console.error('Failed to get public URL');
            return { status: false, errors: { image: 'Failed to generate image URL' } };
        }

        // Prepare numeric conversions
        const parsedPrice = parseFloat(String(price));

        await prisma.home.update({
            where: { id: homeId },
            data: {
                title: String(title).trim(),
                description: String(description).trim(),
                photo: publicUrl,
                guest: guest || '1',
                bathrooms: bathrooms || '1',
                bedrooms: bedrooms || '1',
                price: parsedPrice,
            },
        });

        return {
            status: true,
            redirectUrl: `/create/${homeId}/address`,
        };
    } catch (err) {
        console.error('saveDescription error:', err);
        return { status: false, errors: { description: 'Failed to save description. Please try again.' } };
    }

}

export const createLocation = async (
    prevState: { status: boolean; errors?: { countryValue?: string; homeId?: string }; redirectUrl?: string; } | undefined,
    formData: FormData
) => {
    const homeId = formData.get('homeId') as string;
    const countryValue = formData.get('countryValue') as string;

    console.log('createLocation', { homeId, countryValue })

    if (!homeId || typeof homeId !== 'string') {
        return { status: false, errors: { homeId: 'homeId is required' } };
    }
    if (!countryValue || typeof countryValue !== 'string') {
        return { status: false, errors: { countryValue: 'Country is required' } };
    }

    await prisma.home.update({
        where: {
            id: homeId
        },
        data: {
            country: countryValue
        }
    })

    return {
        status: true,
        redirectUrl: `/`,
    };
}

export const toggleUserHomeFavoriteStatusAction = async (
    prevState: { status: boolean; error?: string; message?: string } | undefined,
    formData: FormData
) => {
    try {
        const homeId = formData.get("homeId") as string;
        const userId = formData.get("userId") as string;
        const pathName = formData.get("pathName") as string;

        if (!homeId?.trim() || !userId?.trim()) {
            return { status: false, error: "homeId and userId are required" };
        }

        // 1️⃣ Check if favorite exists
        const existingFavorite = await prisma.favorite.findUnique({
            where: {
                userId_homeId: {
                    userId,
                    homeId,
                },
            },
        });

        // 2️⃣ Toggle
        if (existingFavorite) {
            await prisma.favorite.delete({
                where: {
                    userId_homeId: {
                        userId,
                        homeId,
                    },
                },
            });

            revalidatePath(pathName)
            return {
                status: true,
                message: "Home removed from favorite list successfully",
            };
        }

        await prisma.favorite.create({
            data: {
                userId,
                homeId,
            },
        });

        revalidatePath(pathName)

        return {
            status: true,
            message: "Home added to favorite list successfully",
        };
    } catch (error) {
        console.error("toggleUserHomeFavoriteStatusAction error:", error);
        return {
            status: false,
            error: "Something went wrong while processing favorite action",
        };
    }
};



export async function createReservation(prevState: {
    status: boolean;
    message: string;
     redirectUrl?: string;
} | undefined, formData: FormData) {
    try {
        const userId = formData.get('userId') as string;
        const homeId = formData.get('homeId') as string;
        const startDate = formData.get('startDate') as string;
        const endDate = formData.get('endDate') as string;

        if (!userId || !homeId || !startDate || !endDate) {
            return {
                status: false,
                message: "Please fill in all required fields"
            };
        }

        await prisma.reservation.create({
            data: {
                userId,
                endDate,
                startDate,
                homeId
            }
        })
        return {
            status: true,
            message: "Home reserved successfully",
            redirectUrl: '/'
        };
    } catch (error) {
        return {
            status: false,
            message: "Oops! something went wrong"
        };
    }
}   