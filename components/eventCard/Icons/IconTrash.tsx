import { useAuth } from "@/context/AuthContext";
import { useEvent } from "@/context/EventContext";
import { TypeEvent } from "@/types/type";
import { Trash } from "lucide-react";
import React from "react";

type Props = {
  event: TypeEvent;
};

const IconTrash = ({ event }: Props) => {
  const { lockedEvent, handleDelete, unlockThisEvent } = useEvent();

  const { loginUser } = useAuth();
  return (
    <Trash
      size={14}
      onClick={() => {
        handleDelete(event.id);
        if (loginUser && lockedEvent?.id === event.id) unlockThisEvent();
      }}
      className="cursor-pointer duration-300 hover:opacity-70"
    />
  );
};

export default IconTrash;
