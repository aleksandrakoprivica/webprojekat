"use client";

import React, { FC, useState } from "react";
import moment from "moment";
import detailsEventModal from "@/components/details-event-modal";
import DetailsEventModal from "@/components/details-event-modal";

interface EventItemProps {
  eventItem: any;
  getEvents: () => void;
  currentUserEmail: string | null;
}

const EventItemUser: FC<EventItemProps> = ({
  eventItem,
  getEvents,
  currentUserEmail,
}) => {

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);
  return (
    <div
      className={
        "bg-orange-300 flex h-[80px] w-full gap-3 justify-between items-center px-4"
      }
    >
      <div className={"flex flex-col items-center"}>
        <div className={"text-orange-800 font-bold"}>Event Name</div>
        <div className={"text-black"}>{eventItem.name}</div>
      </div>
      <div className={"flex flex-col items-center"}>
        <div className={"text-orange-800 font-bold"}>Date</div>
        <div className={"text-black"}>
          {moment(eventItem.date).format("dd-mm-yyyy")}
        </div>
      </div>
      <div className={"flex flex-col items-center"}>
        <div className={"text-orange-800 font-bold"}>Created</div>
        <div className={"text-black"}>{eventItem.createdAt}</div>
      </div>
      <div
        className={"text-red-700 font-mono cursor-pointer "}
        onClick={() => setIsDetailsModalOpen(true)}
      >
        VIEW DETAILS
      </div>


      <DetailsEventModal
        currentUserEmail={currentUserEmail}
        getEvents={getEvents}
        isOpen={isDetailsModalOpen}
        onClose={() => {
          getEvents();
          setIsDetailsModalOpen(false);
        }}
        event={eventItem}
      />
    </div>
  );
};

export default EventItemUser;
