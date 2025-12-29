"use client"

import { createReservation } from '@/app/actions'
import CategoryShowCase from '@/app/components/CategoryShowCase'
import HomeMap from '@/app/components/HomeMap'
import SelectCalendar from '@/app/components/SelectCalendar'
import { getCountryByValue } from '@/app/lib/getCountries'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    profileImage: string | null;
}

type FullHome = {
    user: User | null;
    id: string;
    createdAt: Date;
    userId: string;
    title: string | null;
    description: string | null;
    guest: string | null;
    bedrooms: string | null;
    bathrooms: string | null;
    country: string | null;
    photo: string | null;
    price: number | null;
    category: string | null;
}

interface HomeClientProps {
    user: KindeUser<Record<string, string>> | null
    home: FullHome
    homeId: string,
    reservations?: {
        id: string;
        startDate: Date;
        endDate: Date;
    }[]
}

export default function HomeClient({ user, home, homeId, reservations }: HomeClientProps) {
    const [state, formAction, isPending] = useActionState(createReservation, undefined)
    const country = getCountryByValue(home.country as string)

    useEffect(() => {
        if (state?.status && state.redirectUrl) {
            toast.success(state.message)
            redirect(state.redirectUrl)
        } else if (state && !state.status) {
            toast.error(state.message)
        }
    }, [state])

    return (
        <div className='container px-5 mx-auto mt-10 mb-12'>
            <h1 className='mb-5 text-2xl font-medium'>
                {home.title || 'Untitled Property'}
            </h1>

            <div className='flex items-center mb-5 gap-x-2 text-muted-foreground'>
                <p>{country?.flag} {country?.label} / {country?.region}</p>
            </div>

            {home.photo && (
                <div className="relative h-137.5">
                    <Image
                        src={home.photo}
                        alt={home.title || 'Property image'}
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>
            )}

            <div className='flex flex-wrap justify-between gap-24 mt-8 md:flex-nowrap'>
                <div className="md:w-2/3">
                    <h3 className='text-xl font-medium'>{country?.flag} {country?.label} / {country?.region}</h3>
                    <div className='flex gap-x-2 text-muted-foreground'>
                        <p>{home.guest} guest</p> * <p>{home.bedrooms} Bedrooms</p> * <p>{home.bathrooms} Bathroom</p>
                    </div>
                    <div className="flex items-center mt-6">
                        <Image
                            className='rounded-full'
                            src={home.user?.profileImage as string}
                            alt={home.user?.firstName as string}
                            width={44}
                            height={44}
                        />

                        <div className="flex flex-col ml-4">
                            <h3 className='font-medium'>Hosted by {home.user?.firstName}</h3>
                            <p className='text-sm text-muted-foreground'>Host since {(new Date(home.createdAt)).getFullYear()}</p>
                        </div>
                    </div>

                    <Separator className='my-7' />
                    <CategoryShowCase categoryName={home.category as string} />
                    <Separator className='my-7' />
                    <p className="text-justify text-muted-foreground">{home.description}</p>
                    <Separator className='my-7' />
                    <HomeMap locationValue={country?.value as string} />
                </div>

                <form action={formAction} className=''>
                    <input type='hidden' name='homeId' value={homeId} />
                    <input type='hidden' name='userId' value={user?.id} />
                    <SelectCalendar reservations={reservations} />

                    {user?.id ? (
                        <Button className='flex items-center w-full' type='submit' disabled={isPending}>
                            {isPending ? (
                                <>
                                    <Loader2 className='w-4 h-4 animate-pulse' />
                                    <span>Please wait...</span>
                                </>
                            ) : (
                                'Make a Reservation'
                            )}
                        </Button>
                    ) : (
                        <Button className='w-full' asChild>
                            <Link href={'/api/auth/login'}>Make a Reservation</Link>
                        </Button>
                    )}
                </form>
            </div>
        </div>
    )
}