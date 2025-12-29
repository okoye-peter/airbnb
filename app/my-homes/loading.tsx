import React from 'react'
import SkeletonCard from '../components/SkeletonCard'

const MyHomesLoading = () => {
    return (
        <div className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
        </div>
    )
}

export default MyHomesLoading