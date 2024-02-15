import {
  fontDancingScript,
  fontMerriweather,
  fontRaleway,
} from "@/components/utils/fonts";
import { calculateLeftDays } from "@/functions/functions";
import { TypeEvent } from "@/types/type";
import { twMerge } from "tailwind-merge";

type Props = {
  event: TypeEvent;
};

const LeftDays = ({ event }: Props) => {
  return (
    <div
      className={twMerge(
        "text-center dark:text-white",
        fontDancingScript.className
      )}
    >
      {calculateLeftDays(event.eventDate.toDate()) <= 0 ? (
        <>
          <span className="text-center text-5xl">
            Believe in yourself!
          </span>
          <div className="my-1 text-center text-xs text-transparent">-</div>
        </>
      ) : (
        <div className="flex flex-col">
          <div className="flex items-end justify-center gap-2 italic">
            <strong
              className={twMerge(
                "block text-5xl",
                calculateLeftDays(event.eventDate.toDate()) <= 3
                  ? "text-red-500"
                  : ""
              )}
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

export default LeftDays;
