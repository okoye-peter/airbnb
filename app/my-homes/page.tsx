import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db"
import { redirect } from "next/navigation";
import NoItem from "../components/NoItem";
import { ListingCard } from "../components/ListingCard";
import { Suspense } from "react";
import MyHomesLoading from "./loading";

const getData = async (userId: string) => {
    const data = await prisma.home.findMany({
        where: {
            userId,
            category: { not: null },
            description: { not: null },
        },
        select: {
            id: true,
            country: true,
            photo: true,
            description: true,
            price: true,
            favorites: {
                where: {
                    userId
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return data;
}

// Separate component for the homes list
async function HomesList({ userId }: { userId: string }) {
    const homes = await getData(userId);

    if (homes.length === 0) {
        return (
            <NoItem
                title="You don't have any Homes listed"
                description="Please list a home on airbnb so that you can see it right here"
            />
        );
    }

    return (
        <div className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3">
            {homes.map((home) => (
                <ListingCard
                    home={home}
                    key={home.id}
                    pathName="/my-homes"
                    userId={userId}
                />
            ))}
        </div>
    );
}

export default async function MyHomes() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) redirect('/');

    return (
        <section className="container px-5 mx-auto mt-10 lg:px-10">
            <h2 className="text-3xl font-semibold tracking-tight">Your Homes</h2>

            <Suspense fallback={<MyHomesLoading />}>
                <HomesList userId={user.id} />
            </Suspense>
        </section>
    );
}