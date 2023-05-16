import React, { FC } from "react";
import Modal from "react-modal";

interface DeleteEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: number;
}

const DeleteEventModal: FC<DeleteEventModalProps> = ({
  isOpen,
  onClose,
  id,
}) => {
  const deleteEvent = async () => {
    await fetch(`/api/admin/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }).then(() => onClose());
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      {`Do you want to delete event with id: ${id}`}
      <div className={"flex gap-3 mt-auto"}>
        <button
          onClick={() => deleteEvent()}
          className={
            "border-black bg-cyan-600 text-white hover:bg-white hover:text-black flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none"
          }
        >
          YES
        </button>

        <button
          onClick={() => onClose()}
          className={
            "border-black bg-cyan-600 text-white hover:bg-white hover:text-black flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none"
          }
        >
          NO
        </button>
      </div>
    </Modal>
  );
};

export default DeleteEventModal;
