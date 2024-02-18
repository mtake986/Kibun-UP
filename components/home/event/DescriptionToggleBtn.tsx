import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TypeEvent } from "@/types/type";
import { AiOutlineInfoCircle } from "react-icons/ai";
type Props = {
  event: TypeEvent;
};
const DescriptionToggleBtn = ({ event }: Props) => {
  if (event.description) {
    return (
      <Popover>
        <PopoverTrigger
          className="absolute right-5 top-5 cursor-pointer duration-300 hover:opacity-50 sm:right-12 sm:top-12"
          aria-label="Display a description of the event"
          role="button"
        >
          <AiOutlineInfoCircle size={14} />
        </PopoverTrigger>
        <PopoverContent className="bg-white text-xs dark:bg-slate-800">
          {event.description}
        </PopoverContent>
      </Popover>
    );
  } else return null;
};

export default DescriptionToggleBtn;
