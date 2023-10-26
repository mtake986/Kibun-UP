import { TypeEvent } from "@/types/type";
import HeadingThree from "@/components/utils/HeadingThree";
import { MdPlace } from "react-icons/md";
import { BiInfoCircle, BiTime } from "react-icons/bi";

type Props = {
  event: TypeEvent;
};

type InfoProps = {
  icon: React.ReactNode;
  text: string;
};
const Info: React.FC<InfoProps> = ({ icon, text }) => (
  <div className="flex items-center">
    <div className="flex w-10">{icon}</div>
    <p>{text}</p>
  </div>
);
const Content = ({ event }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      <HeadingThree
        text={event.eventTitle}
        className="text-center text-2xl font-semibold"
      />
      {event.place && (
        <Info
          icon={<MdPlace size={20} className="mr-5" />}
          text={event.place}
        />
      )}
      {event.eventDate && (
        <Info
          icon={<BiTime size={24} className="mr-5" />}
          text={event.eventDate ? event.eventDate.toDate().toDateString() : 'Error'}
        />
      )}
      {event.description && (
        <Info
          icon={<BiInfoCircle size={24} className="mr-5" />}
          text={event.description}
        />
      )}
    </div>
  );
};
export default Content;
