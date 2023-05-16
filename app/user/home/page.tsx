"use client";

import SignOut from "@/components/sign-out";
import EventItem from "@/components/event-item";
import AddNewEventModal from "@/components/add-new-modal";
import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import EventItemUser from "@/components/event-item-user";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    await fetch("/api/admin").then(async (events) => {
      return setEvents(await events.json());
    });
  };

  return (
    <div className="flex flex-col h-full bg-black">
      <div className={"flex h-[50px] w-full bg-orange-200"}>
        <div className="flex-col justify-center items-center h-screen">
          <h1 className=" justify-center font-extrabold text-amber-900 flex items-center text-xl">
            CHOOSE AN EVENT YOU WOULD LIKE TO ATTEND
          </h1>
        </div>
        <div className={" bg-orange-200 absolute right-0"}>
          <SignOut />
        </div>
      </div>

      <div className={"text-amber-50 flex flex-col gap-3"}>
        {events.map((event) => {
          return (
            <EventItemUser
              currentUserEmail={currentUserEmail}
              eventItem={event}
              getEvents={getEvents}
            />
          );
        })}
      </div>
    </div>
  );
}
