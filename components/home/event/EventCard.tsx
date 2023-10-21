import { IEvent } from "@/types/type";
import React from "react";

import OccuringDate from "./OccuringDate";
import DescriptionToggleBtn from "./DescriptionToggleBtn";
import LeftDays from "./LeftDays";
import Icons from "./Icons";
import HeadingFour from "@/components/utils/HeadingFour";

type Props = {
  event: IEvent;
  type: "random" | "locked";
};

const EventCard = ({ event, type }: Props) => {
  return (
    <div
      className="relative bg-violet-50 p-6 sm:rounded-lg sm:p-12"
      // style={{
      //   color: "white",
      //   background:
      //     "linear-gradient(109.6deg, rgb(123, 90, 224) 10%, rgb(164, 46, 253) 30%, rgb(213, 56, 234) 60%, rgb(251, 138, 52) 100%)",
      // }}
    >
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
