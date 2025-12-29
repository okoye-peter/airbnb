import { Suspense } from 'react'
import prisma from '../lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import NoItem from '../components/NoItem';
import { ListingCard } from '../components/ListingCard';
// import SkeletonCard from '../components/SkeletonCard';


const getData = async (userId: string) => {
    const data = await prisma.reservation.findMany({
        where: {
            userId
        },
        include:{
            home: {
                include: {
                    favorites:{
                        where: {
                            userId
                        }
                    }
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return data;
}
const Reservations = () => {
    return (
        <>
            <ShowItems />
        </>
    )
}

export default Reservations


async function ShowItems() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) return redirect('/')

    const data = await getData(user.id)

    return (
        <>
            {
                data.length === 0
                    ?
                    <NoItem />
                    :
                    <div className="grid gap-8 mt-8 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3">
                        {data.map((item) => (<ListingCard key={item.id} home={{ ...item.home, favorites: [{ id: item.home?.favorites[0]?.id as string, userId: item.home?.favorites[0]?.userId as string, homeId: item.home?.favorites[0]?.homeId as string }] }} userId={user?.id} pathName="/reservations" />))}
                    </div>
            }
        </>
    );
}

// function SkeletonLoading() {
//     return (
//         <div className="grid gap-8 mt-8 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3">
//             <SkeletonCard />
//             <SkeletonCard />
//             <SkeletonCard />
//             <SkeletonCard />
//             <SkeletonCard />
//             <SkeletonCard />
//             <SkeletonCard />
//             <SkeletonCard />
//         </div>
//     )
// }