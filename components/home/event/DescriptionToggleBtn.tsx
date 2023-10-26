import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { TypeEvent } from "@/types/type";
import { AiOutlineInfoCircle } from "react-icons/ai";
type Props = {
  event: TypeEvent;
};
const DescriptionToggleBtn = ({ event }: Props) => {
  if (event.description) {
    return (
      <HoverCard>
        <HoverCardTrigger className="absolute right-5 top-5 cursor-pointer duration-300 hover:opacity-50 sm:right-12 sm:top-12">
          <AiOutlineInfoCircle size={16} />
        </HoverCardTrigger>
        <HoverCardContent>{event.description}</HoverCardContent>
      </HoverCard>
    );
  } else return null;
};

export default DescriptionToggleBtn;
