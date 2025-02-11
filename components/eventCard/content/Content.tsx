import { TypeEvent } from "@/types/type";
import HeadingThree from "@/components/utils/HeadingThree";
import { MdCalendarMonth, MdPlace } from "react-icons/md";
import { BiInfoCircle, BiTime } from "react-icons/bi";
import { LuCalendarClock } from "react-icons/lu";
import { calculateLeftDays } from "@/functions/functions";
import { returnLeftDaysString } from "./returnLeftDaysString";
import Tags from "@/components/utils/Tags";

type Props = {
  event: TypeEvent;
};

type InfoProps = {
  icon: React.ReactNode;
  text: string;
};
const Info: React.FC<InfoProps> = ({ icon, text }) => (
  <div className="flex items-center">
    <div className="mr-2 h-4 w-4">{icon}</div>
    <p className="whitespace-pre-line">{text}</p>
  </div>
);
const Content = ({ event }: Props) => {
  return (
    <div className="flex flex-col space-y-3">
      <h3 className="text-center text-2xl font-semibold">{event.eventTitle}</h3>

      {event.place ? (
        <Info icon={<MdPlace size={16} />} text={event.place} />
      ) : null}
      {event.eventDate ? (
        <Info
          icon={<MdCalendarMonth size={16} />}
          text={event.eventDate ? event.eventDate.toDate().toDateString() : ""}
        />
      ) : null}
      {event.eventDate ? (
        <div className="flex items-center">
          <div className="mr-2 flex h-4 w-4">
            <LuCalendarClock size={16} />
          </div>
          <p>
            {returnLeftDaysString(calculateLeftDays(event.eventDate.toDate()))}
          </p>
        </div>
      ) : null}
      {event.description ? (
        <Info icon={<BiInfoCircle size={16} />} text={event.description} />
      ) : null}
      {event?.tags && event?.tags?.length >= 1 ? <Tags tags={event.tags} /> : null}
    </div>
  );
};
export default Content;
