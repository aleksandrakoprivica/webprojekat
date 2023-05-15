"use client";

import React, { FC, useState } from "react";
import moment from "moment";
import DeleteEventModal from "@/components/delete-event-modal";
import EditEventModal from "@/components/edit-event-modal";

interface EventItemProps {
  eventItem: any;
  getEvents: () => void;
  currentUserEmail: string | null;
}

const EventItem: FC<EventItemProps> = ({ eventItem, getEvents, currentUserEmail}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
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
        <div className={"text-orange-800 font-bold"}>Description</div>
        <div className={"text-black"}>{eventItem.description}</div>
      </div>
      <div className={"flex flex-col items-center"}>
        <div className={"text-orange-800 font-bold"}>Location</div>
        <div className={"text-black"}>{eventItem.location}</div>
      </div>
      <div className={"flex flex-col items-center"}>
        <div className={"text-orange-800 font-bold"}>Author Email</div>
        <div className={"text-black"}>{eventItem.authorEmail}</div>
      </div>
      <div className={"flex flex-col items-center"}>
        <div className={"text-orange-800 font-bold"}>Type</div>
        <div className={"text-black"}>{eventItem.type}</div>
      </div>
      <div className={"flex flex-col items-center"}>
        <div className={"text-orange-800 font-bold"}>Created</div>
        <div className={"text-black"}>{eventItem.createdAt}</div>
      </div>
      <div className={"flex flex-col items-center"}>
        <div className={"text-orange-800 font-bold"}>Attendees</div>
        <div className={"text-black"}>77</div>
      </div>

      <div className={"bg-amber-50 text-amber-900 font-bold cursor-pointer"}>
        VIEW ATTENDEES
      </div>
      <div
        className={"text-red-700 font-mono cursor-pointer "}
        onClick={() => setIsDeleteModalOpen(true)}
      >
        DELETE
      </div>
      <div
        onClick={() => setIsEditModalOpen(true)}
        className={"bg-amber-50 text-orange-800 font-bold cursor-pointer"}
      >
        EDIT
      </div>
      <DeleteEventModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          getEvents();
          setIsDeleteModalOpen(false);
        }}
        id={eventItem.id}
      />
      <EditEventModal
          currentUserEmail={currentUserEmail}
          getEvents={getEvents}
        isOpen={isEditModalOpen}
        onClose={() => {
          getEvents();
          setIsEditModalOpen(false);
        }}
        event={eventItem}
      />
    </div>
  );
};

export default EventItem;
