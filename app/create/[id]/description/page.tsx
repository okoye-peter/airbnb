"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader } from "@/components/ui/card"
import Counter from "@/app/components/Counter"
import HomeCreationBottom from "@/app/components/HomeCreationBottom"
import { saveDescription } from "@/app/actions"
import { useActionState, useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import SuccessModal from "@/app/components/SuccessModal";

export default function Description({ params }: { params: Promise<{ id: string }> }) {
    const [homeId, setHomeId] = useState<string>('');
    const [state, formAction, isPending] = useActionState(saveDescription, undefined)
    const router = useRouter();

    // Use useEffect to handle the promise for homeId
    useEffect(() => {
        const fetchData = async () => {
            const resolvedParams = await params;
            setHomeId(resolvedParams.id);
        };
        fetchData();
    }, [params]);

    // Derive whether to show the success modal from the action state.
    const successOpen = Boolean(state?.status && state?.redirectUrl);

    const handleSuccessClose = () => {
        if (state?.redirectUrl) router.push(state.redirectUrl);
    };

    return (
        <>
            <div className="w-3/5 mx-auto">
                <h2 className="text-3xl font-semibold tracking-tight transition-colors">
                    Please describe your home as good as you can
                </h2>
            </div>
            <form action={formAction}>
                <input type="hidden" name="homeId" value={homeId} />
                <div className="flex flex-col w-3/5 mx-auto mt-10 gap-y-5 mb-36">
                    <div className="flex flex-col gap-y-2">
                        <Label>Title</Label>
                        <Input type="text" placeholder="Enter title" name="title" required />
                        {state?.errors?.title && <p className="mt-1 text-sm text-destructive">{state?.errors.title}</p>}
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label>Description</Label>
                        <Textarea placeholder="Enter the description of your house" name="description" required />
                        {state?.errors?.description && <p className="mt-1 text-sm text-destructive">{state?.errors.description}</p>}
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label>Price</Label>
                        <Input type="number" placeholder="price per night in USD" name="price" required min={10} />
                        {state?.errors?.price && <p className="mt-1 text-sm text-destructive">{state?.errors.price}</p>}
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label>Image</Label>
                        <Input type="file" placeholder="upload home image" name="image" required />
                        {state?.errors?.image && <p className="mt-1 text-sm text-destructive">{state?.errors.image}</p>}
                    </div>
                    <Card>
                        <CardHeader className="flex flex-col gap-y-5">
                            <div className="flex items-center justify-between flex-1 w-full">
                                <div className="flex flex-col">
                                    <h2 className="font-medium">Total Guest Allowed</h2>
                                </div>
                                <Counter inputName="guest" />
                            </div>
                            <div className="flex items-center justify-between flex-1 w-full">
                                <div className="flex flex-col">
                                    <h2 className="font-medium">Total rooms in apartment</h2>
                                </div>
                                <Counter inputName="bedrooms" />
                            </div>
                            <div className="flex items-center justify-between flex-1 w-full">
                                <div className="flex flex-col">
                                    <h2 className="font-medium">Total bathrooms in apartment</h2>
                                </div>
                                <Counter inputName="bathrooms" />
                            </div>
                        </CardHeader>
                    </Card>



                    {/* <div className="flex flex-col gap-y-2">
                        <Label htmlFor="email">Your email address</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </div> */}


                </div>
                {state && !state.status && state.errors?.description && (
                    <div className="w-3/5 mx-auto mt-4 text-sm text-center text-destructive">{state.errors.description}</div>
                )}
                <HomeCreationBottom isPending={isPending} />
                <SuccessModal
                    open={successOpen}
                    title="Saved"
                    description="Your home details were saved successfully."
                    onClose={handleSuccessClose}
                />
            </form>
        </>
    )
}