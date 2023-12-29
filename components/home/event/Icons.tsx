import LoadingSpinnerS from "@/components/utils/LoadingSpinnerS";
import { useAuth } from "@/context/AuthContext";
import { useEvent } from "@/context/EventContext";
import { TypeEvent } from "@/types/type";
import { Target } from "lucide-react";
import React, { useState } from "react";
import { BiRefresh } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

type Props = {
  event: TypeEvent;
  type: "random" | "locked";
};
const Icons = ({ event, type }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { loginUser } = useAuth();

  const { getRandomEvent, lockThisEvent, unlockThisEvent } = useEvent();

  if (loading) {
    return <LoadingSpinnerS />;
  }
  return (
    <div className="flex items-center justify-end gap-3">
      <BiRefresh
        onClick={() => {
          if (type === "locked") alert("To refresh, unlock this event first.");
          else {
            setLoading(true);
            setTimeout(() => {
              getRandomEvent();
              setLoading(false);
            }, 1000);
          }
        }}
        className={twMerge(
          type === "locked"
            ? "cursor-not-allowed opacity-30 duration-300"
            : "cursor-pointer duration-300 hover:opacity-50"
        )}
        size={20}
      />

      <Target
        onClick={() => {
          if (type === "locked") {
            if (loginUser) unlockThisEvent(loginUser.uid);
          } else {
            if (loginUser) lockThisEvent(loginUser.uid, event);
          }
        }}
        className={twMerge(
          type === "locked"
            ? "cursor-pointer text-red-500 duration-300 hover:opacity-50"
            : "cursor-pointer duration-300 hover:opacity-50"
        )}
        size={14}
      />
    </div>
  );
};

export default Icons;
