import { fontMerriweather } from "@/components/utils/fonts";
import { TypeEvent } from "@/types/type";
import { twMerge } from "tailwind-merge";

type Props = {
  event: TypeEvent;
};
const OccuringDate = ({ event }: Props) => {
  return (
    <span className={twMerge(fontMerriweather.className)}>
      {event.eventDate.toDate().getMonth() + 1}/
      {event.eventDate.toDate().getDate()},{" "}
      {event.eventDate.toDate().getFullYear()}
    </span>
  );
};

export default OccuringDate;
