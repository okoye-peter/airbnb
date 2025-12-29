import { File } from 'lucide-react'
import React from 'react'

const NoItem = ({ title, description }: {title?: string, description?: string}) => {
  return (
    <div className='flex flex-col items-center justify-center p-8 mt-10 text-center border border-dashed rounded-md min-h-100 animate-in fade-in-50'>
        <div className='flex items-center justify-center w-20 h-20 rounded-full bg-primary/10'>
            <File className='w-10 h-10 text-primary' />
        </div>

        <h2 className='mt-6 text-xl font-semibold'>{title ?? 'No Home found for the selected category....'}</h2>
        <p className='mt-2 text-sm leading-6 text-center text-muted-foreground'>{description ?? 'Please check other categories or create your own home'}</p>
    </div>
  )
}

export default NoItem