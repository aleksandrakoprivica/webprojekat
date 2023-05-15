"use client";

import SignOut from "@/components/sign-out";
import React, { useEffect, useState } from "react";
import EventItem from "@/components/event-item";
import AddNewEventModal from "@/components/add-new-modal";
import { getSession } from "next-auth/react";
import { session } from "next-auth/core/routes";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [isAddNewEventOpen, setIsAddNewEventOpen] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const getUserSession = async () => {
    const session = await getSession();
    return session;
  };

  useEffect(() => {
    getUserSession().then((session) =>
      setCurrentUserEmail(session?.user?.email ?? null)
    );
  }, []);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    await fetch("/api/admin").then(async (events) => {
      return setEvents(await events.json());
    });
  };

  if (events.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col h-full bg-black">
      <div className={"flex h-[50px] w-full bg-orange-200"}>
        <div className="flex-col justify-center items-center h-screen">
          <h1 className=" justify-center font-extrabold text-amber-900 flex items-center text-3xl">
            MANAGE EVENTS
          </h1>
        </div>
        <div className={" bg-orange-200 absolute right-0"}>
          <SignOut />
        </div>
      </div>

      <div className={"text-amber-50 flex flex-col gap-3"}>
        {events.map((event) => {
          return <EventItem currentUserEmail={currentUserEmail} eventItem={event} getEvents={getEvents} />;
        })}
      </div>
      <AddNewEventModal
        isOpen={isAddNewEventOpen}
        onClose={() => setIsAddNewEventOpen(false)}
        currentUserEmail={currentUserEmail}
        getEvents={getEvents}
      />
      <div
        className="justify-center h-[100px] items-center font-bold bg-orange-200 flex text-black"
        onClick={() => setIsAddNewEventOpen(true)}
      >
        ADD NEW EVENT
      </div>
    </div>
  );
}
