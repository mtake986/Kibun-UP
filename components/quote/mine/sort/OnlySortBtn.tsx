import React from "react";
import { Button } from "@/components/ui/button";
import { BiSort } from "react-icons/bi";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useQuote } from "@/context/QuoteContext";

const OnlySortBtn = () => {
  const { onlySortMyQuotes } = useQuote();

  const buttonClass =
    "rounded-md bg-green-50 px-3 py-2.5 text-sm text-green-500 duration-300 ease-in hover:bg-green-100 dark:bg-green-700 dark:text-white  dark:hover:bg-green-600";
  
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button
          className = { buttonClass }
          onClick={() => {
            onlySortMyQuotes();
          }}
        >
          <BiSort size={20} />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-auto px-3 py-2 text-center text-xs">
        Only Sort
      </HoverCardContent>
    </HoverCard>
  );
};

export default OnlySortBtn;
