import LoadingSpinnerS from "@/components/utils/LoadingSpinnerS";
import LoadingSpinnerXS from "@/components/utils/LoadingSpinnerXS";
import { useEvent } from "@/context/EventContext";
import { displayErrorToast } from "@/functions/displayToast";
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
    return <LoadingSpinnerXS num={3} />;
  }

  const handleLock = async () => {
    setIsLoading(true);
    try {
      await lockThisEvent(event);
    } catch (error) {
      console.error(error);
      displayErrorToast(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnlock = async () => {
    setIsLoading(true);
    try {
      await unlockThisEvent();
    } catch (error) {
      console.error(error);
      displayErrorToast(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <span className="duration-300 hover:opacity-50">
      {lockedEvent?.id === event.id ? (
        <Target
          size={14}
          onClick={handleUnlock}
          className="cursor-pointer text-red-500 duration-300 hover:opacity-70"
        />
      ) : (
        <Target
          size={14}
          onClick={handleLock}
          className="cursor-pointer hover:opacity-70"
        />
      )}
    </span>
  );
};
export default IconLock;
