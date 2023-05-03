'use client'

import SignOut from "@/components/sign-out";
import {useEffect, useState} from "react";

export default function Home() {
    const [events, setEvents] = useState([])

    useEffect(() => {
        getEvents().then((events) => {
            setEvents(events)
        })
    },[])

    const getEvents = async () => {
        const events = await fetch('/api/admin')

        return await events.json()
    }

  return (
    <div className="flex h-screen bg-black">
        <button className={'bg-amber-50'} onClick={() => getEvents()}>Get events</button>
        <SignOut />
        <div className={'text-amber-50'}>
            {events.map((event) => {
                return (
                    <p>{JSON.stringify(event)}</p>
                )
            })}
        </div>
    </div>
  );
}
