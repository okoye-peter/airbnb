'use client'

import { useCountries } from "@/app/lib/getCountries"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import React, { useActionState, useEffect, useState } from 'react'
import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"
import HomeCreationBottom from "@/app/components/HomeCreationBottom"
import { createLocation } from "@/app/actions"
import SuccessModal from "@/app/components/SuccessModal"
import { useRouter } from "next/navigation";

const LazyMap = dynamic(() => import("@/app/components/Map"), {
    ssr: false,
    loading: () => <Skeleton className="h-[50vh] w-full" />
})

// Define the state type to match your createLocation action
type LocationState = {
    status: boolean;
    errors?: {
        countryValue?: string;
    };
    redirectUrl?: string;
} | undefined;

const HomeAddress = ({ params }: { params: Promise<{ id: string }> }) => {
    const [homeId, setHomeId] = useState<string>('');
    const [state, formAction, isPending] = useActionState<LocationState, FormData>(createLocation, undefined)
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            setHomeId((await params).id)
        }

        fetchData()
    }, [params])

    const { getAllCountries } = useCountries()

    const [locationValue, setLocationValue] = useState('')

    const successOpen = Boolean(state?.status && state?.redirectUrl);

    const handleSuccessClose = () => {
        if (state?.redirectUrl) router.push(state.redirectUrl);
    };

    return (
        <>
            <div className='w-3/5 mx-auto'>
                <h2 className='text-3xl font-semibold tracking-tight transition-colors mb-10'>
                    Where is your home located?
                </h2>
            </div>

            <form action={formAction}>
                <input type="hidden" name="homeId" value={homeId || ''} />
                <input type="hidden" name="countryValue" value={locationValue || ''} />

                <div className="w-3/5 mx-auto mb-36">
                    <div className="mb-5 w-full">
                        <Select required onValueChange={(value) => setLocationValue(value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a Country" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Countries</SelectLabel>
                                    {getAllCountries().map((item) => (
                                        <SelectItem key={item.value} value={item.value}>
                                            {item.flag} {item.label} / {item.region}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {state?.errors?.countryValue && (
                            <p className="text-sm text-destructive mt-1">
                                {state.errors.countryValue}
                            </p>
                        )}
                    </div>
                    <LazyMap locationValue={locationValue} />
                </div>
                <HomeCreationBottom isPending={isPending} />
                <SuccessModal
                    open={successOpen}
                    title="Saved"
                    description="Your home address was saved successfully."
                    onClose={handleSuccessClose}
                />
            </form>
        </>
    )
}

export default HomeAddress