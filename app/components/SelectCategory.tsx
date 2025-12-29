"use client"

import { Card, CardHeader } from "@/components/ui/card";
import { categoryItems, iAppProps } from "../lib/categoryItems";
import Image from "next/image";
import { useState } from "react";


export function SelectCategory() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    return (
        <div className="grid w-3/5 gap-8 mx-auto mt-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mb-36">
            {categoryItems.map((item: iAppProps) =>
            (<div key={item.id} className="cursor-pointer">
                <Card onClick={() => setSelectedCategory(item.name)} className={selectedCategory === item.name ? 'border-primary border-2' : ''}>
                    <CardHeader>
                        <Image
                            src={item.imageUrl}
                            width={32}
                            height={32}
                            alt={item.title}
                        />
                        <h3 className="font-medium">{item.name}</h3>
                    </CardHeader>
                </Card>
            </div>)
            )}
            <input type="hidden" name="category" value={selectedCategory ?? ''} />
        </div>
    )
}