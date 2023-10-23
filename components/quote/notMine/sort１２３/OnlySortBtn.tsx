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
  const {onlySortNotMyQuotes} = useQuote();

  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button
          className={`cursor-pointer bg-green-50 text-green-500 hover:bg-green-100 hover:text-green-500`}
          onClick={() => {
            onlySortNotMyQuotes();
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
