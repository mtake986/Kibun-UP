import { useEvent } from "@/context/EventContext";
import { TypeEvent } from "@/types/type";
import { Target } from "lucide-react";
import React from "react";

type Props = {
  event: TypeEvent;
};

const IconLock = ({ event }: Props) => {
  const { lockThisEvent, lockedEvent, unlockThisEvent } = useEvent();

  return (
    <span className="duration-300 hover:opacity-50">
      {lockedEvent?.id === event.id ? (
        <Target
          size={16}
          onClick={() => {
            unlockThisEvent();
          }}
          className="cursor-pointer text-red-500 duration-300 hover:opacity-70"
        />
      ) : (
        <Target
          size={16}
          onClick={() => {
            lockThisEvent(event);
            // alert("Set as a target");
          }}
          className="cursor-pointer hover:opacity-70"
        />
      )}
    </span>
  );
};

export default IconLock;
