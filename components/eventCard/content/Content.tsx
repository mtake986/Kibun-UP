import { TypeEvent } from "@/types/type";
import HeadingThree from "@/components/utils/HeadingThree";
import { MdPlace } from "react-icons/md";
import { BiInfoCircle, BiTime } from "react-icons/bi";

type Props = {
  event: TypeEvent;
};
const Content = ({event}: Props) => {
  return (
    <div className="flex flex-col gap-3">
      {/* <BsCalendarEvent size={24} /> */}
      <HeadingThree
        text={event.eventTitle}
        className="text-center text-2xl font-semibold"
      />
      {event.place && (
        <div className="flex items-center">
          <div className="flex w-10">
            <MdPlace size={20} className="mr-5" />
          </div>
          <p className="">{event.place}</p>
        </div>
      )}
      {event.eventDate && (
        <div className="flex items-center">
          <div className="flex w-10">
            <BiTime size={24} className="mr-5" />
          </div>
          <p>{event.eventDate.toDate().toDateString()}</p>
        </div>
      )}
      {event.description && (
        <div className="flex items-center">
          <div className="flex w-10">
            <BiInfoCircle size={24} className="mr-5" />
          </div>
          <p className="">{event.description}</p>
        </div>
      )}
    </div>
  );
};

export default Content;
