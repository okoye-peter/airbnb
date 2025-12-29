"use client"

import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'

import { Search } from 'lucide-react'
import { useState } from 'react'
import { useCountries } from '../lib/getCountries'
import HomeMap from './HomeMap'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import Counter from './Counter'

// Fixed: Proper function syntax and return type
function SubmitButtonLocal({ step, setStep }: { step: number; setStep: React.Dispatch<React.SetStateAction<number>> }) {
    if (step === 1) {
        return (
            <Button
                onClick={(e) => {
                    e.preventDefault(); // Prevent form submission
                    setStep((prev) => prev + 1);
                }}
                type='button'
            >
                Next
            </Button>
        )
    } else if (step === 2) {
        return (<Button type='submit'>Submit</Button>)
    }
    return null
}


const SearchComponent = () => {
    const [step, setStep] = useState(1)
    const [location, setLocationValue] = useState('')
    const { getAllCountries } = useCountries()

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className='flex items-center px-5 py-2 border rounded-full cursor-pointer'>
                    <div className="flex h-full font-medium divide-x">
                        <p className="px-4">Anywhere</p>
                        <p className="px-4">Any Week</p>
                        <p className="px-4">Add Guests</p>
                    </div>
                    <Search className='w-6 h-6 p-1 text-white rounded-full bg-primary' />
                </div>
            </DialogTrigger>
            <DialogContent className='sm:max-w-106.25'>
                <form className='flex flex-col gap-4'>
                    <input type="hidden" name="country" value={location} />
                    {
                        step === 1 ?
                            (
                                <>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Select a Country
                                        </DialogTitle>
                                        <DialogDescription>
                                            Please Choose a Country, so that we know what you want
                                        </DialogDescription>
                                    </DialogHeader>

                                    <Select required onValueChange={(value) => setLocationValue(value)} value={location}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a Country" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Countries</SelectLabel>
                                                {getAllCountries().map((item) => (
                                                    <SelectItem key={item.value} value={item.value}>
                                                        {item.flag} {item.label} / {item.region}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                    <HomeMap locationValue={location} />
                                </>
                            )
                            : (
                                <>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Select all the info you need
                                        </DialogTitle>
                                        <DialogDescription>
                                            Describe what you are looking for
                                        </DialogDescription>
                                    </DialogHeader>
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
                                    {/*  */}
                                    {/* Add your step 2 content here */}
                                </>
                            )
                    }
                    <DialogFooter>
                        <SubmitButtonLocal step={step} setStep={setStep} />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default SearchComponent