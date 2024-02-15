import { TypeEvent } from "@/types/type";
import OccuringDate from "./OccuringDate";
import DescriptionToggleBtn from "./DescriptionToggleBtn";
import LeftDays from "./LeftDays";
import Icons from "./Icons";
import HeadingFour from "@/components/utils/HeadingFour";

type Props = {
  event: TypeEvent;
  type: "random" | "locked";
};

const EventCard = ({ event, type }: Props) => {
  return (
    <div className="relative bg-violet-50 p-6 dark:bg-slate-900 sm:rounded-lg sm:p-12">
      <DescriptionToggleBtn event={event} />
      <LeftDays event={event} />
      <HeadingFour text={event.eventTitle} />
      {/* </Suspense> */}
      <div className="mt-5 flex justify-between text-right text-xs">
        <OccuringDate event={event} />
        <Icons event={event} type={type} />
      </div>
    </div>
  );
};

export default EventCard;
