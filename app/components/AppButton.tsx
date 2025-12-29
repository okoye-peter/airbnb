"use client"

import React from 'react'
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner"

interface Props {
    children: React.ReactNode | string,
    isPending: boolean
}

const AppButton = ({ children, isPending }: Props) => {
    
    return (
        <>
            <Button size={'lg'} disabled={isPending ?? false}>
                { isPending ? <Spinner /> : children }
            </Button>
        </>
    )
}

export default AppButton