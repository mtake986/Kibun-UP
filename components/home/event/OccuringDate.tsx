import { fontMerriweather } from "@/components/utils/fonts";
import { TypeEvent } from "@/types/type";

type Props = {
  event: TypeEvent;
};
const OccuringDate = ({ event }: Props) => {
  return (
    <span className={`${fontMerriweather.className}`}>
      {event.eventDate.toDate().getMonth() + 1}/
      {event.eventDate.toDate().getDate()},{" "}
      {event.eventDate.toDate().getFullYear()}
    </span>
  );
};

export default OccuringDate;
