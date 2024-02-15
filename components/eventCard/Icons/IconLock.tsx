import LoadingSpinnerS from "@/components/utils/LoadingSpinnerS";
import LoadingSpinnerXS from "@/components/utils/LoadingSpinnerXS";
import { useEvent } from "@/context/EventContext";
import { displayErrorToast } from "@/functions/displayToast";
import { TypeEvent, TypeUserFromFirestore } from "@/types/type";
import { Target } from "lucide-react";
import React, { useState } from "react";

type Props = {
  event: TypeEvent;
  loginUser: TypeUserFromFirestore;
};

const IconLock = ({ event, loginUser }: Props) => {
  const { lockThisEvent, lockedEvent, unlockThisEvent } = useEvent();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (isLoading) {
    return <LoadingSpinnerXS num={3.5} />;
  }

  const handleLock = async () => {
    setIsLoading(true);
    try {
      await lockThisEvent(loginUser.uid, event);
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
      await unlockThisEvent(loginUser.uid);
    } catch (error) {
      console.error(error);
      displayErrorToast(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <span>
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
          className="cursor-pointer duration-300 hover:opacity-70"
        />
      )}
    </span>
  );
};
export default IconLock;
