import SkeletonCard from "../components/SkeletonCard";

function SkeletonLoading() {
    return (
        <div className="grid gap-8 mt-8 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3">
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

export default SkeletonLoading;