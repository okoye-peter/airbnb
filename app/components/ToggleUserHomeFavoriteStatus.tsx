import { Button } from '@/components/ui/button';
import { Heart, Loader2 } from 'lucide-react';

interface Props {
    // homeId: string,
    // userId: string
    isPending: boolean,
    isFavorite: boolean,
    
}

const ToggleUserHomeFavoriteStatus = ({ isPending, isFavorite }: Props) => {

    return (
        <>
            {
                isPending ? (
                    <Button  className='bg-primary-foreground' size={'icon'} variant={'outline'} disabled={isPending}>
                        <Loader2 className='w-4 h-4 animate-pulse' />
                    </Button>
                )
                :
                (
                    <Button disabled={isPending} variant={'outline'} size={'icon'} className='bg-primary-foreground' type='submit'>
                        {
                            isFavorite ?
                            <Heart className='w-4 h-4 text-red-600' fill='#F23838' />
                            :
                            <Heart className='w-4 h-4' />
                        }
                    </Button>
                )

            }
        </>
    )
}

export default ToggleUserHomeFavoriteStatus