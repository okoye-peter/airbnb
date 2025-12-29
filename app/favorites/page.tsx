import { Suspense } from 'react'
import prisma from '../lib/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import NoItem from '../components/NoItem'
import type { Home } from '@prisma/client'
import { ListingCard } from '../components/ListingCard'
import SkeletonCard from '../components/SkeletonCard'

interface Favorite {
    id: string,
    userId: string,
    homeId: string,
    home: Home
}

const getData = async (userId: string): Promise<Favorite[]> => {
    const data = await prisma.favorite.findMany({
        where: {
            userId
        },
        include: {
            home: true
        }
    })

    return data;
}

const Page = async () => {

    return (
        <div className='container py-5 mx-auto mt-10 lg:py-10'>
            <h2 className='text-3xl font-semibold tracking-tight'>Your favorites</h2>
          
                <Suspense key={'favorites'} fallback={<SkeletonLoading />}>
                    <ShowItems />
                </Suspense>
        </div>
    )
}

export default Page

async function ShowItems() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if(!user) return redirect('/')
        
    const data = await getData(user.id)

    return (
        <>
            {
                data.length === 0
                    ?
                    <NoItem />
                    :
                    <div className="grid gap-8 mt-8 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3">
                        {data.map((item) => (<ListingCard key={item.id} home={{...item.home, favorites:[{ id: item.id, userId: item.userId, homeId: item.homeId }]}} userId={user?.id} pathName="/favorites" />))}
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