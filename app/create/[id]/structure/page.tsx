"use client";
import { SelectCategory } from "@/app/components/SelectCategory";
import { useActionState } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { saveCategory } from "@/app/actions";
import HomeCreationBottom from "@/app/components/HomeCreationBottom";

export default function StructureRoute({ params }: { params: Promise<{ id: string }> }) {
    const [homeId, setHomeId] = useState<string>('');
    const [state, formAction, isPending] = useActionState(saveCategory, undefined);
    const router = useRouter();
    
    // Use useEffect to handle the promise for homeId
    useEffect(() => {
        const fetchData = async () => {
            const resolvedParams = await params;
            setHomeId(resolvedParams.id);
        };
        fetchData();
    }, [params]);

    // Handle redirect on success
    useEffect(() => {
        if (state?.stats && state?.redirectUrl) {
            router.push(state.redirectUrl);
        }
    }, [state, router]);

    return (
        <>
            <div className="w-3/5 mx-auto">
                <h2 className="text-3xl font-semibold tracking-tight transition-colors">
                    Which of these best describe your Home?
                </h2>
                {state?.errors && (
                    <div className="text-red-500 mt-2">
                        {state.errors.home || state.errors.category}
                    </div>
                )}
            </div>
            <form action={formAction}>
                <input type="hidden" name="homeId" value={homeId} />
                <SelectCategory />
                <HomeCreationBottom isPending={isPending} />
            </form>
        </>
    );
}