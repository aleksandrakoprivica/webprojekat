"use client";

import { FC } from "react";

interface EventItemProps {
  eventItem: any;
}

const EventItem: FC<EventItemProps> = ({ eventItem }) => {
  return (
    <div className={"bg-amber-700 flex h-[80px] w-full gap-3"}>
      <div className={"flex flex-col items-center"}>
        <div>name</div>
        <div>{eventItem.name}</div>
      </div>
        <div className={"flex flex-col items-center"}>
            <div>date</div>
            <div>{eventItem.date}</div>
        </div>
        <div className={"flex flex-col items-center"}>
            <div>description</div>
            <div>{eventItem.description}</div>
        </div>
        <div className={"flex flex-col items-center"}>
            <div>location</div>
            <div>{eventItem.location}</div>
        </div>
        <div className={"flex flex-col items-center"}>
            <div>authorEmail</div>
            <div>{eventItem.email}</div>
        </div>
        <div className={"flex flex-col items-center"}>
            <div>type</div>
            <div>{eventItem.type}</div>
        </div>
        <div className={"flex flex-col items-center"}>
            <div>createdAt</div>
            <div>{eventItem.createdAt}</div>
        </div>

      <div>DELETE</div>
      <div>EDIT</div>
    </div>
  );
};

export default EventItem;
