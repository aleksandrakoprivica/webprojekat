"use client"

import {FC} from "react"

interface EventItemProps {
    eventItem: any
}

const EventItem: FC<EventItemProps> = ({eventItem}) => {
    return <div className={'bg-amber-700 flex h-[80px] w-full gap-3'}>
        <div className={'flex flex-col items-center'}>
            <div>name</div>
            <div>{eventItem.name}</div>
        </div>
        <div>date</div>
        <div>{eventItem.date}
        </div>
        <div>
            DELETE
        </div>
        <div>
            EDIT
        </div>
    </div>
}

export default EventItem