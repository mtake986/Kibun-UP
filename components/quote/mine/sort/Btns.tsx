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
    sortAndFilterMyQuotes,
    resetSortFilterByForMineInputs,
  } = useQuote();

  return (
    <>
      <HoverCard>
        <HoverCardTrigger>
          <Button
            className={`cursor-pointer bg-sky-50 text-sky-500 hover:bg-sky-100 hover:text-sky-500 hover:opacity-70 dark:bg-slate-900 dark:text-white`}
            onClick={() => {
              sortAndFilterMyQuotes();
            }}
          >
            <SearchIcon size={20} />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-auto px-3 py-2 text-center">
          Sort & Filter
        </HoverCardContent>
      </HoverCard>
      <Button
        className={`hover:opacity-70 cursor-pointer bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-500 dark:bg-slate-900 dark:text-white`}
        onClick={() => {
          getLoginUserQuotes();
          resetSortFilterByForMineInputs();
        }}
      >
        Reset
      </Button>
    </>
  );
};

export default Btns;
