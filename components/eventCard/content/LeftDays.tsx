import {
  fontDancingScript,
  fontMerriweather,
  fontRaleway,
} from "@/components/utils/fonts";
import { calculateLeftDays } from "@/functions/functions";
import { TypeEvent } from "@/types/type";

type Props = {
  event: TypeEvent;
};
const LeftDays = ({ event }: Props) => {
  return (
    <div
      className={`text-center ${fontDancingScript.className} dark:text-white`}
    >
      {calculateLeftDays(event.eventDate.toDate()) <= 0 ? (
        <span className="text-center">3 days ago</span>
      ) : (
          <div className="flex items-center gap-2">
            <strong
              className={`${
                calculateLeftDays(event.eventDate.toDate()) <= 3
                  ? "text-red-500"
                  : null
              }`}
            >
              {calculateLeftDays(event.eventDate.toDate())}
            </strong>
            <span className="">
              {calculateLeftDays(event.eventDate.toDate()) >= 2
                ? "days"
                : "day"}
            </span>
          </div>
      )}
    </div>
  );
};

export default LeftDays;
