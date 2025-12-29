import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import prisma from '@/app/lib/db'
import HomeClient from './HomeClient'
import NoItem from '@/app/components/NoItem'

async function getData(homeId: string) {
    const data = await prisma.home.findUnique({
        where: { id: homeId },
        select: {
            id: true,
            title: true,
            photo: true,
            country: true,
            price: true,
            description: true,
            guest: true,
            bedrooms: true,
            bathrooms: true,
            category: true,
            createdAt: true,
            userId: true,
            user: {
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    profileImage: true
                }
            },
            reservation:{
                select: {
                    id: true,
                    startDate: true,
                    endDate: true
                }
            }
        }
    })
    return data
}

export default async function HomeRoute({ 
    params 
}: { 
    params: Promise<{ id: string }> // Changed: params is now a Promise
}) {
    const { id: homeId } = await params // Added: await params
    const { getUser } = getKindeServerSession()
    
    const [user, home] = await Promise.all([
        getUser(),
        getData(homeId)
    ])

    if (!home) {
        return (
            <NoItem
                title='No Home found'
                description='Home with the provided ID could not be found'
            />
        )
    }

    return <HomeClient user={user} home={home} homeId={homeId} reservations={home.reservation} />
}