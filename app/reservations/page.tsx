import prisma from '../lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import NoItem from '../components/NoItem';
import { ListingCard } from '../components/ListingCard';
import { unstable_noStore } from 'next/cache'


const getData = async (userId: string) => {
    unstable_noStore();
    const data = await prisma.reservation.findMany({
        where: {
            userId
        },
        include:{
            home: {
                select: {
                    id: true,
                    description: true,
                    photo: true,
                    price: true,
                    country: true,
                    favorites: {
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
                        {data
                            .filter((item) => item.home !== null) // Filter out null homes
                            .map((item) => (
                                <ListingCard 
                                    key={item.id} 
                                    home={item.home!} // Non-null assertion since we filtered
                                    userId={user.id} 
                                    pathName="/reservations" 
                                />
                            ))
                        }
                    </div>
            }
        </>
    );
}