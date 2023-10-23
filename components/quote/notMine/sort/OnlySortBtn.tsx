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

  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button
          className={`cursor-pointer bg-green-50 text-green-500 hover:bg-green-100 hover:text-green-500 hover:opacity-70 dark:bg-slate-900 dark:text-white`}
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
