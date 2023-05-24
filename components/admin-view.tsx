import React, { FC, useEffect, useState } from "react";
import AddNewEventModal from "@/components/add-new-modal";
import EventItem from "@/components/event-item";

interface AdminViewProps {
  currentUser: any;
}

const AdminView: FC<AdminViewProps> = ({ currentUser }) => {
  const [events, setEvents] = useState([]);
  const [isAddNewEventOpen, setIsAddNewEventOpen] = useState(false);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    await fetch("/api/event").then(async (events) => {
      return setEvents(await events.json());
    });
  };

  return (
    <div className={"w-screen"}>
      <div className={"text-amber-50 flex flex-col gap-3"}>
        {events.map((event) => {
          return (
            <EventItem
              currentUserId={currentUser.id}
              eventItem={event}
              getEvents={getEvents}
            />
          );
        })}
      </div>
      <AddNewEventModal
        isOpen={isAddNewEventOpen}
        onClose={() => setIsAddNewEventOpen(false)}
        currentUserId={currentUser.id}
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
};

export default AdminView;
