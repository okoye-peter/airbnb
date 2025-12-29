"use client";

import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'
import React, { useState } from 'react'

const Counter = ({inputName}: {inputName: string}) => {
    const [count, setCount] = useState(0);
    return (
        <div className='flex items-center gap-4'>
            <Button onClick={() => { if(count > 0) setCount(prev => prev - 1) }} variant="outline" size="icon" type='button'>
                <Minus className='h-4 w-4 text-primary' />
            </Button>
            <p className='font-semibold'>{count}</p>
            <Button onClick={() => setCount(prev => prev + 1)} variant="outline" size="icon" type='button'>
                <Plus className='h-4 w-4 text-primary' />
            </Button>
            <input type="hidden" name={inputName} value={count} />
        </div>
    )
}

export default Counter