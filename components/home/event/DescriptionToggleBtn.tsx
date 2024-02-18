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
        <PopoverTrigger className="absolute right-5 top-5 cursor-pointer duration-300 hover:opacity-50 sm:right-12 sm:top-12">
          <AiOutlineInfoCircle size={14} />
        </PopoverTrigger>
        <PopoverContent className="text-xs bg-white dark:bg-slate-800">{event.description}</PopoverContent>
      </Popover>
    );
  } else return null;
};

export default DescriptionToggleBtn;
