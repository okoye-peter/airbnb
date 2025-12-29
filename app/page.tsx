import { Suspense } from "react";
import { ListingCard } from "./components/ListingCard";
import MapFilterItems from "./components/MapFilterItems";
import prisma from "./lib/db";
import SkeletonCard from "./components/SkeletonCard";
import NoItem from "./components/NoItem";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const getData = async ({ searchParams, userId }: { searchParams?: Promise<{ filter?: string, country?: string, guest?: string, bedrooms?: string, bathrooms?: string }>, userId?: string }) => {
    const { filter, country, guest, bedrooms } = await searchParams || {}
    return await prisma.home.findMany({
        where: {
            NOT: {
                description: null,
                country: null,
            },
            category: filter ?? undefined,
            guest,
            country,
            bedrooms
        },
        select: {
            id: true,
            photo: true,
            price: true,
            description: true,
            country: true,
            favorites: {
                where: {
                    userId: userId ?? undefined 
                }
            }
        }
    })
}

export default async function Home({ searchParams }: { searchParams?: Promise<{ filter?: string }> }) {
    const filter = (await searchParams)?.filter
    return (
        <div className="container px-5 mx-auto lg:px-10">
            <MapFilterItems />

            <Suspense key={filter} fallback={<SkeletonLoading />}>
                <ShowItems searchParams={searchParams} />
            </Suspense>
            {/* <Button>Hello Shadcn Button</Button> */}
        </div>
    );
}

async function ShowItems({ searchParams }: { searchParams?: Promise<{ filter?: string }> }) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const data = await getData({ searchParams, userId: user?.id })

    return (
        <>
            {
                data.length === 0
                    ?
                    <NoItem />
                    :
                    <div className="grid gap-8 mt-8 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3">
                        {data.map((item) => (<ListingCard key={item.id} home={item} userId={user?.id} pathName="/" />))}
                    </div>
            }
        </>
    );
}

function SkeletonLoading() {
    return (
        <div className="grid gap-8 mt-8 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
        </div>
    )
}
