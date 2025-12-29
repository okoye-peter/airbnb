import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const HomeDetailLoading = () => {
  return (
    <div className='w-[75%] mx-auto mt-10'>
        <Skeleton className='w-1/3 h-4' />
        <Skeleton className='w-full h-137.5 mt-5' />
        <div className="flex justify-between mt-8 gap-x-24">
            <div className="w-2/3">
                <Skeleton className='w-1/3 h-4' />
                <Skeleton className='w-1/3 h-4 mt-3' />
            </div>
            <div className="w-1/3">
            <Skeleton className='w-full h-72' />
            </div>
        </div>
    </div>
  )
}

export default HomeDetailLoading