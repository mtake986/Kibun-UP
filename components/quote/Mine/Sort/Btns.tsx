import { useQuote } from "@/context/QuoteContext";
import React from "react";

import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const Btns = () => {
  const {
    getLoginUserQuotes,
    fetchFilteredMyQuotes,
    setFilteredLoginUserQuotes,
  } = useQuote();

  return (
    <>
      <HoverCard>
        <HoverCardTrigger>
          <Button
            className={`cursor-pointer bg-sky-50 text-sky-500 hover:bg-sky-100 hover:text-sky-500`}
            onClick={() => {
              fetchFilteredMyQuotes();
            }}
          >
            <SearchIcon size={20} />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-auto px-3 py-2 text-center text-sm">
          Sort & Filter
        </HoverCardContent>
      </HoverCard>
      <Button
        className={`cursor-pointer bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-500`}
        onClick={() => {
          setFilteredLoginUserQuotes([]);
          getLoginUserQuotes();
        }}
      >
        Reset
      </Button>
    </>
  );
};

export default Btns;
