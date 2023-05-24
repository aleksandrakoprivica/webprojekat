import React, { FC } from "react";
import Modal from "react-modal";

interface AttendeesModalProps {
  isOpen: boolean;
  onClose: () => void;
  attendees: any;
}

const AttendeesModal: FC<AttendeesModalProps> = ({
  isOpen,
  onClose,
  attendees,
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <div className={"flex gap-3 mt-auto flex-col"}>
        {attendees.map((attendee: any, index: number) => {
          return <div>{`${index + 1}. ${attendee.user.email}`}</div>;
        })}
      </div>
    </Modal>
  );
};

export default AttendeesModal;
