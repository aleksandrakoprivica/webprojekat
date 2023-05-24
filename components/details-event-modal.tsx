import React, { FC } from "react";
import Modal from "react-modal";
import classNames from "classnames";

interface DetailsEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: any;
  currentUserId: string | null;
  isMyEvents?: boolean;
}

const DetailsEventModal: FC<DetailsEventModalProps> = ({
  isOpen,
  onClose,
  event,
  currentUserId,
  isMyEvents,
}) => {
  const applyToEvent = async () => {
    await fetch("/api/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: currentUserId,
        eventId: event.id,
      }),
    });
    onClose();
  };

  const removeAttendance = async () => {
    await fetch("/api/attendance/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: currentUserId,
        eventId: event.id,
      }),
    });
    onClose();
  };

  console.log(
    !!event.attendees?.find(
      (attendee: any) => attendee.userId === currentUserId
    )
  );

  return (
    <Modal
      className={
        "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      }
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <div className={"m-4 bg-amber-100"}>
        <div className="bg-orange-200 p-4">
          <h2 className="text-2xl mb-4 font-bold text-amber-900 ">
            EVENT DETAILS
          </h2>
        </div>
        <div className={"h-full flex flex-col"}>
          <label
            htmlFor="eventName"
            className="block text-xs text-gray-600 uppercase"
          >
            Name
          </label>
          <input
            defaultValue={event.name}
            disabled={true}
            className="mt-1 block w-full  rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
          <label
            htmlFor="description"
            className="block text-xs text-gray-600 uppercase"
          >
            Description
          </label>
          <input
            defaultValue={event.description}
            disabled={true}
            className="mt-1 block w-full  rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
          <label
            htmlFor="type"
            className="block text-xs text-gray-600 uppercase"
          >
            Type
          </label>
          <input
            defaultValue={event.type}
            disabled={true}
            className="mt-1 block w-full  rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
          <label
            htmlFor="location"
            className="block text-xs text-gray-600 uppercase"
          >
            Location
          </label>
          <input
            defaultValue={event.location}
            disabled={true}
            className="mt-1 block w-full  rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
          <label
            htmlFor="date"
            className="block text-xs text-gray-600 uppercase"
          >
            Date
          </label>
          <input
            defaultValue={`${event.date.split("T")[0]}`}
            disabled={true}
            className="mt-1 block w-full  rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />

          <div className={"flex gap-3 mt-auto"}>
            {!isMyEvents && (
              <button
                disabled={
                  !!event.attendees.find(
                    (attendee: any) => attendee.userId === currentUserId
                  )
                }
                className={classNames(
                  "border-black bg-cyan-600 text-white hover:bg-white hover:text-black flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none",
                  {
                    "hover:bg-gray-400 bg-gray-400 hover:text-white cursor-not-allowed":
                      !!event.attendees.find(
                        (attendee: any) => attendee.userId === currentUserId
                      ),
                  }
                )}
                onClick={() => applyToEvent()}
              >
                {event.attendees.find(
                  (attendee: any) => attendee.userId === currentUserId
                )
                  ? "Already attending"
                  : "Attend"}
              </button>
            )}
            {isMyEvents && (
              <button
                className={
                  "border-black bg-cyan-600 text-white hover:bg-white hover:text-black flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none"
                }
                onClick={() => removeAttendance()}
              >
                Remove attendance
              </button>
            )}

            <button
              onClick={() => onClose()}
              className={
                "border-black bg-cyan-600 text-white hover:bg-white hover:text-black flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none"
              }
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DetailsEventModal;
