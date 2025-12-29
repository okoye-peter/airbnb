import React from 'react'

const ReservationLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='container py-5 mx-auto mt-10 lg:py-10'>
            <h2 className='text-3xl font-semibold tracking-tight'>Your Reservations</h2>
            
            {children}
        </div>
    )
}

export default ReservationLayout