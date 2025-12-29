"use client"

import Link from "next/link";
import { categoryItems, type iAppProps } from "../lib/categoryItems";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { cn } from "@/lib/utils";

export default function MapFilter() {
    const searchParams = useSearchParams();
    const search = searchParams.get('filter')
    const pathName = usePathname();

    const createQueryString = useCallback((name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(name, value)
        return params.toString()
    }, [searchParams])


    return (
        <div className="flex justify-between w-full mt-5 overflow-x-auto gap-x-10 no-scrollbar">
            {
                categoryItems.map((item: iAppProps) => (
                    <Link key={item.id} href={`${pathName}?${createQueryString('filter', item.name)}`} className={cn(
                        search == item.name ? 'border-b-2 border-black pb-2 shrink-0' : 'opacity-70 shrink-0', 'flex flex-col gap-y-3 items-center'
                    )}>
                        <div className="relative w-6 h-6">
                            <Image
                                src={item.imageUrl}
                                alt="Category image"
                                width={24}
                                height={24}
                            />
                        </div>
                        <p className="text-xs font-medium">{item.title}</p>
                    </Link>
                ))
            }
        </div>
    )
}