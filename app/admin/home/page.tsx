"use client";

import SignOut from "@/components/sign-out";
import React, { useEffect, useState } from "react";
import AuthStatus from "@/components/auth-status";
import EventItem from "@/components/event-item";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then((events) => {
      setEvents(events);
    });
  }, []);

  const getEvents = async () => {
    const events = await fetch("/api/admin");

    return await events.json();
  };

  if (events.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col h-screen bg-black">
      <div className={"flex h-[100px] w-full bg-cyan-600"}>
        <div>Manage events</div>
        <div className={"absolute right-0"}>
          <SignOut />
        </div>
      </div>
      <div className={"text-amber-50 flex flex-col gap-3"}>
        {events.map((event) => {
          return <EventItem eventItem={event} />;
        })}
      </div>
    </div>
  );
}
