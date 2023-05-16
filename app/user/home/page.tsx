"use client";

import SignOut from "@/components/sign-out";
import EventItem from "@/components/event-item";
import AddNewEventModal from "@/components/add-new-modal";
import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import EventItemUser from "@/components/event-item-user";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<"allEvents" | "myEvents">(
    "allEvents"
  );

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    if (currentUserEmail) {
      getUser();
    }
  }, [currentUserEmail]);

  const getUserSession = async () => {
    const session = await getSession();
    return session;
  };

  useEffect(() => {
    getUserSession().then((session) => {
      setCurrentUserEmail(session?.user?.email ?? null);
    });
  }, []);

  const getEvents = async () => {
    await fetch("/api/user").then(async (events) => {
      return setEvents(await events.json());
    });
  };

  const getUser = async () => {
    await fetch(`/api/user/${currentUserEmail}`).then(async (user) => {
      const response: any = await user.json();
      setMyEvents(response.events);
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
      <div className={"inline-flex bg-white h-10"}>
        <div
          style={{
            background: selectedTab === "allEvents" ? "#d2691e" : "#808080",
          }}
          className={"cursor-pointer w-1/2 flex justify-center items-center"}
          onClick={() => setSelectedTab("allEvents")}
        >
          All events
        </div>
        <div
          style={{
            background: selectedTab === "myEvents" ? "#d2691e" : "#808080",
          }}
          className={"cursor-pointer w-1/2 flex justify-center items-center"}
          onClick={() => setSelectedTab("myEvents")}
        >
          My events
        </div>
      </div>
      {selectedTab === "allEvents" && (
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
      )}
      {selectedTab === "myEvents" && (
        <div className={"text-amber-50 flex flex-col gap-3"}>
          {myEvents.map((event) => {
            return (
              <EventItemUser
                currentUserEmail={currentUserEmail}
                eventItem={event}
                getEvents={getEvents}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
