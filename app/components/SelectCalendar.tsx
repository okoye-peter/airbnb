"use client"

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { DateRange } from 'react-date-range'
import { useState } from 'react';
import { eachDayOfInterval } from 'date-fns';

interface Range {
    startDate: Date;
    endDate: Date;
    key: string;
}

const SelectCalendar = ({ reservations }: {
    reservations?: {
        id: string;
        startDate: Date;
        endDate: Date;
    }[]
}) => {

    const [state, setState] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: "selection"
    }])

    let disabledDates:Date[] = [];

    reservations?.forEach((reservation) => {
        const dateRange = eachDayOfInterval({
            start: new Date(reservation.startDate),
            end: new Date(reservation.endDate),
        })

        disabledDates = [...disabledDates, ...dateRange]
    })

    return (
        <>
            <DateRange
                date={new Date}
                showDateDisplay={false}
                rangeColors={["#FF5A5F"]}
                ranges={state}
                onChange={(item) => setState([item.selection as Range])}
                minDate={new Date()}
                direction='vertical'
                disabledDates={disabledDates}
            />
            <input type="hidden" name='startDate' value={state[0].startDate.toISOString()} />
            <input type="hidden" name='endDate' value={state[0].endDate.toISOString()} />
        </>
    )
}

export default SelectCalendar