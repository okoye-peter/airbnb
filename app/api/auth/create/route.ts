import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function GET() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();


    if (!user || !user.id) {
        throw new Error('Something went wrong, no user found');
    }

    // Check if user exists in database
    let dbUser = await prisma.user.findUnique({
        where: {
            id: user.id
        }
    });

    // Create user if they don't exist
    if (!dbUser) {
        dbUser = await prisma.user.create({
            data: {
                id: user.id,
                email: user.email ?? '',
                firstName: user.given_name ?? '',
                lastName: user.family_name ?? '',
                profileImage: user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
            }
        });
    }

    return redirect('/');
}