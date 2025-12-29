import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const SkeletonCard = () => {
  return (
    <div className='flex flex-col space-y-3'>
        <Skeleton className='w-full rounded-lg h-72' />
        <div className='flex flex-col space-y-2'>
            <Skeleton className='w-full h-4' />
            <Skeleton className='w-3/4 h-4' />
            <Skeleton className='w-1/3 h-4' />
        </div>
    </div>
  )
}

export default SkeletonCard