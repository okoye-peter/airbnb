/**
 * Cloudinary Upload API utility
 * Uses the Upload API directly without SDK
 */

export interface CloudinaryUploadResponse {
    secure_url: string;
    public_id: string;
    asset_id: string;
    version: number;
    format: string;
    resource_type: string;
    created_at: string;
    bytes: number;
    width: number;
    height: number;
    url: string;
}

export interface CloudinaryUploadError {
    error: {
        message: string;
    };
}

/**
 * Upload an image to Cloudinary using the Upload API
 * @param file - The file to upload
 * @param folder - Optional folder path in Cloudinary (e.g., 'airbnb/homes')
 * @returns The Cloudinary response with secure_url and public_id
 */
export async function uploadToCloudinary(
    file: File,
    folder?: string
): Promise<CloudinaryUploadResponse> {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

    // Debug logging
    console.log('Cloudinary Config:', {
        cloudName: cloudName ? `${cloudName.substring(0, 3)}...` : 'NOT SET',
        uploadPreset: uploadPreset ? `${uploadPreset.substring(0, 3)}...` : 'NOT SET',
        hasCloudName: !!cloudName,
        hasUploadPreset: !!uploadPreset
    });

    if (!cloudName) {
        throw new Error('CLOUDINARY_CLOUD_NAME is not configured');
    }

    if (!uploadPreset) {
        throw new Error('CLOUDINARY_UPLOAD_PRESET is not configured');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    if (folder) {
        formData.append('folder', folder);
    }

    // Add timestamp for unique filenames
    formData.append('timestamp', Date.now().toString());

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
            method: 'POST',
            body: formData,
        }
    );

    if (!response.ok) {
        const errorData = (await response.json()) as CloudinaryUploadError;
        throw new Error(
            `Cloudinary upload failed: ${errorData.error?.message || 'Unknown error'}`
        );
    }

    const data = (await response.json()) as CloudinaryUploadResponse;
    return data;
}

/**
 * Delete an image from Cloudinary using the public_id
 * Note: This requires server-side authentication with API key and secret
 * For now, this is a placeholder - implement when needed
 */
export async function deleteFromCloudinary(_publicId: string): Promise<void> {
    // This would require signed requests with API key and secret
    // For unsigned uploads, deletion should be handled via Cloudinary dashboard
    // or by implementing a signed API endpoint
    console.warn('Delete functionality requires signed API implementation');
}
