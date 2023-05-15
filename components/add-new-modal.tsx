import {getSession} from "next-auth/react";

"use-client";

import React, {FC, useEffect} from "react";
import Modal from "react-modal";
import LoadingDots from "@/components/loading-dots";

interface AddNewEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserEmail: string | null;
}

const AddNewEventModal: FC<AddNewEventModalProps> = ({isOpen, onClose, currentUserEmail}) => {
  return (
      <Modal isOpen={isOpen} onRequestClose={onClose}>
        <form onSubmit={async (e) => {
          await fetch('/api/admin', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: e.currentTarget.eventName.value,
              description: e.currentTarget.description.value,
              type: e.currentTarget.type.value,
              location: e.currentTarget.location.value,
              date: new Date(e.currentTarget.date.value),
              authorEmail: currentUserEmail
            }),
          }).then(() => {
            console.log('created new event')
            onClose()
          })
        }}>
          <div className={"h-full flex flex-col"}>
            <label htmlFor="eventName" className="block text-xs text-gray-600 uppercase">
              Name
            </label>
            <input
                id="eventName"
                name="eventName"
                type="name"
                required
                className="mt-1 block w-full  rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
            <label
                htmlFor="description"
                className="block text-xs text-gray-600 uppercase"
            >
              Description
            </label>
            <input
                id="description"
                name="description"
                type="description"
                required
                className="mt-1 block w-full  rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
            <label htmlFor="type" className="block text-xs text-gray-600 uppercase">
              Type
            </label>
            <input
                id="type"
                name="type"
                type="type"
                required
                className="mt-1 block w-full  rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
            <label
                htmlFor="location"
                className="block text-xs text-gray-600 uppercase"
            >
              Location
            </label>
            <input
                id="location"
                name="location"
                type="location"
                required
                className="mt-1 block w-full  rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
            <label htmlFor="date" className="block text-xs text-gray-600 uppercase">
              Date
            </label>
            <input
                id="date"
                name="date"
                type="date"
                required
                className="mt-1 block w-full  rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />

            <div className={"flex gap-3 mt-auto"}>
              <button
                  className={
                    "border-black bg-cyan-600 text-white hover:bg-white hover:text-black flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none"
                  }
              >
                Add
              </button>

              <button
                  onClick={() => onClose()}
                  className={
                    "border-black bg-cyan-600 text-white hover:bg-white hover:text-black flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none"
                  }
              >
                Close
              </button>
            </div>
          </div>
        </form>
      </Modal>
  );
};

export default AddNewEventModal;
