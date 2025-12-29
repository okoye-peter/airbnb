import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import AppButton from './AppButton'
import { ChevronRight } from 'lucide-react'

const HomeCreationBottom = ({ isPending }: { isPending: boolean }) => {
    return (
        <div className="fixed bottom-0 z-10 w-full h-24 bg-white border-t">
            <div className="flex items-center justify-between h-full px-5 mx-auto lg:px-10">
                <Button variant={'secondary'} size={'lg'} asChild>
                    <Link href={'/'}>
                        Cancel
                    </Link>
                </Button>
                <AppButton isPending={isPending} >
                    <span className="flex items-center gap-x-1">
                        <span>Next</span>
                        <ChevronRight size={30} />
                    </span>
                </AppButton>
            </div>
        </div>
    )
}

export default HomeCreationBottom