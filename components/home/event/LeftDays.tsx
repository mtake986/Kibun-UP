import { fontDancingScript, fontMerriweather, fontRaleway } from "@/components/utils/fonts";
import { calculateLeftDays } from "@/functions/functions";
import { IEvent } from "@/types/type";
import React from 'react'

type Props = {
    event: IEvent
}
const LeftDays = ({event}: Props) => {
  return (
    <div className={`text-center ${fontDancingScript.className}`}>
      {calculateLeftDays(event.eventDate.toDate()) <= 0 ? (
        <span className="text-center text-3xl">
          You Can Do It <span className="text-2xl">🎉</span>
        </span>
      ) : (
        <div className="flex flex-col">
          <div className="flex items-end justify-center gap-2 italic">
            <strong
              className={`block text-5xl ${
                calculateLeftDays(event.eventDate.toDate()) <= 3
                  ? "text-red-500"
                  : null
              }`}
            >
              {calculateLeftDays(event.eventDate.toDate())}
            </strong>
            <span className="mb-1 text-sm">
              {calculateLeftDays(event.eventDate.toDate()) >= 2
                ? "days"
                : "day"}
            </span>
          </div>
          <div className="my-1 text-center text-xs">until</div>
        </div>
      )}
    </div>
  );
};

export default LeftDays