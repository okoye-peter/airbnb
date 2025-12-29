"use client"

import Link from "next/link";
import { categoryItems, type iAppProps } from "../lib/categoryItems";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MapFilter() {
    const searchParams = useSearchParams();
    const search = searchParams.get('filter')
    const pathName = usePathname();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true);

    const createQueryString = useCallback((name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(name, value)
        return params.toString()
    }, [searchParams])

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300; // Adjust scroll distance
            const newScrollLeft = direction === 'left' 
                ? scrollContainerRef.current.scrollLeft - scrollAmount
                : scrollContainerRef.current.scrollLeft + scrollAmount;
            
            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftButton(scrollLeft > 0);
            setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    return (
        <div className="relative">
            {showLeftButton && (
                <Button 
                    onClick={() => scroll('left')}
                    className='absolute top-0 left-0 z-10 inline-flex items-center justify-center w-10 h-10 bg-white border border-gray-400 rounded-full shadow-md' 
                    variant='outline'
                >
                    <ChevronLeft className="w-6 h-6" />
                </Button>
            )}
            
            <div 
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex w-full mt-5 overflow-x-auto gap-x-10 no-scrollbar"
            >
                {
                    categoryItems.map((item: iAppProps) => (
                        <Link 
                            key={item.id} 
                            href={`${pathName}?${createQueryString('filter', item.name)}`} 
                            className={cn(
                                search == item.name ? 'border-b-2 border-black pb-2 shrink-0' : 'opacity-70 shrink-0', 
                                'flex flex-col gap-y-3 items-center'
                            )}
                        >
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
            
            {showRightButton && (
                <Button 
                    onClick={() => scroll('right')}
                    className='absolute top-0 right-0 z-10 inline-flex items-center justify-center w-10 h-10 bg-white border border-gray-400 rounded-full shadow-md' 
                    variant='outline'
                >
                    <ChevronRight className="w-6 h-6" />
                </Button>
            )}
        </div>
    )
}