import { useEvent } from "@/context/EventContext";
import { TypeEvent } from "@/types/type";
import { Target } from "lucide-react";
import React, { useState } from "react";

type Props = {
  event: TypeEvent;
};

const IconLock = ({ event }: Props) => {
  const { lockThisEvent, lockedEvent, unlockThisEvent } = useEvent();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (isLoading) {
    return (
      <div
        className="inline-block h-4 w-4 animate-spin rounded-full border-[3px] border-current border-t-transparent text-slate-600"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  return (
    <span className="duration-300 hover:opacity-50">
      {lockedEvent?.id === event.id ? (
        <Target
          size={16}
          onClick={async () => {
            if (isLoading) return;
            setIsLoading(true);
            try {
              await unlockThisEvent();
            } catch (error) {
              console.error(error);
            }
            setIsLoading(false);
          }}
          className="cursor-pointer text-red-500 duration-300 hover:opacity-70"
        />
      ) : (
        <Target
          size={16}
          onClick={async () => {
            setIsLoading(true);
            try {
              await lockThisEvent(event);
            } catch (error) {
              console.error(error);
            }
            setIsLoading(false);
          }}
          className="cursor-pointer hover:opacity-70"
        />
      )}
    </span>
  );
};
export default IconLock;
