import React, { FC, useEffect, useState } from "react";
import EventItemUser from "@/components/event-item-user";

interface UserViewProps {
  currentUser: any;
}

const UserView: FC<UserViewProps> = ({ currentUser }) => {
  const [events, setEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);

  const [selectedTab, setSelectedTab] = useState<"allEvents" | "myEvents">(
    "allEvents"
  );

  const getEvents = async () => {
    await fetch("/api/event").then(async (events) => {
      return setEvents(await events.json());
    });
  };

  const getAttendances = async () => {
    await fetch(`/api/attendance/${currentUser.id}`).then(async (user) => {
      const response: any = await user.json();
      setMyEvents(response);
    });
  };

  useEffect(() => {
    getEvents();
    getAttendances();
  }, []);

  return (
    <div className="flex flex-col h-full w-full bg-black">
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
                currentUserId={currentUser.id}
                eventItem={event}
                getEvents={getEvents}
                getMyEvents={getAttendances}
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
                currentUserId={currentUser.id}
                eventItem={event}
                getEvents={getEvents}
                getMyEvents={getAttendances}
                isMyEvents={true}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserView;
