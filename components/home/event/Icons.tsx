import { useEvent } from "@/context/EventContext";
import { IEvent } from "@/types/type";
import { Target } from "lucide-react";
import React, { useState } from "react";
import { BiRefresh } from "react-icons/bi";

type Props = {
  event: IEvent;
  type: "random" | "locked";
};
const Icons = ({ event, type }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { getRandomEvent, lockThisEvent, unlockThisEvent } = useEvent();

  if (loading) {
    return <div>Loading...</div>;
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
        className={`${
          type === "locked"
            ? "cursor-not-allowed opacity-30 duration-300"
            : "cursor-pointer duration-300 hover:opacity-50"
        }`}
        size={20}
      />

      <Target
        onClick={() => {
          if (type === "locked") unlockThisEvent();
          else lockThisEvent(event);
        }}
        className={`${
          type === "locked"
            ? "cursor-pointer text-red-500 duration-300 hover:opacity-50"
            : "cursor-pointer duration-300 hover:opacity-50"
        }`}
        size={16}
      />
    </div>
  );
};

export default Icons;
