"use client"

import Image from "next/image";
import Link from "next/link";
import { useCountries } from "../lib/getCountries";
import ToggleUserHomeFavoriteStatus from "./ToggleUserHomeFavoriteStatus";
import { useActionState, useEffect } from "react";
import { toggleUserHomeFavoriteStatusAction } from "../actions";
import { toast } from "sonner";

interface Favorite {
    id: string,
    userId: string,
    homeId: string
}
interface Props {
    home: {
        id: string;
        description: string | null;
        photo: string | null;
        price: number | null;
        country: string | null;
        favorites?: Favorite[]
    },
    userId?: string | null,
    pathName: string | null
}

interface FavoriteResponseState {
    status: boolean;
    error?: string | undefined;
    message?: string | undefined;
}

export const ListingCard = ({ home, userId, pathName }: Props) => {
    const { getCountryByValue } = useCountries();
    const [state, formAction, isPending] = useActionState<FavoriteResponseState | undefined, FormData>(toggleUserHomeFavoriteStatusAction, undefined)

    const country = getCountryByValue(home.country as string)

    useEffect(() => {
        if (state) {
            if (state.status && state.message) {
                toast.success(state.message);
            } else if (state.error) {
                toast.error(state.error);
            }
        }
    }, [state]);

    return (
        <div className="flex flex-col">
            <div className="relative h-72">
                <Image src={home.photo as string} alt={home.description as string} fill className="object-cover h-full rounded-lg" />
                {
                    userId &&
                    <form action={formAction} className="absolute z-10 top-2 right-2">
                        <input type="hidden" name="homeId" value={home.id} />
                        <input type="hidden" name="userId" value={userId} />
                        <input type="hidden" name="pathName" value={pathName as string} />

                        <ToggleUserHomeFavoriteStatus
                            isFavorite={home.favorites?.[0]?.userId === userId}
                            isPending={isPending}
                        />
                    </form>
                }
            </div>
            <Link href={`/home/${home.id}`} className="mt-2">
                <h3 className="text-base font-medium">{country?.flag} {country?.label} / {country?.region}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{home.description}</p>
                <p className="pt-2 text-muted-foreground">
                    <span className="font-medium text-black">${home.price}</span> per Night
                </p>
            </Link>
        </div>
    )
}