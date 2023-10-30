import { useQuote } from "@/context/QuoteContext";
import React from "react";
import { SearchIcon } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const Btns = () => {
  const {
    sortAndFilterNotMyQuotes,
    getQuotesNotMine,
    resetSortFilterByForNotMineInputs,
  } = useQuote();

  return (
    <>
      <HoverCard>
        <HoverCardTrigger>
          <button
            className={`rounded-md bg-blue-50 px-3 py-2.5 text-sm text-blue-500 duration-300 ease-in hover:bg-blue-100 dark:bg-blue-700 dark:text-white  dark:hover:bg-blue-600`}
            onClick={() => {
              sortAndFilterNotMyQuotes();
            }}
          >
            <SearchIcon size={20} />
          </button>
        </HoverCardTrigger>
        <HoverCardContent className="w-auto px-3 py-2 text-center">
          Sort & Filter
        </HoverCardContent>
      </HoverCard>
      <button
        className={`rounded-md bg-red-50 px-3 py-2.5 text-sm text-red-500 duration-300 ease-in hover:bg-red-100 dark:bg-red-700 dark:text-white  dark:hover:bg-red-600`}
        onClick={() => {
          getQuotesNotMine();
          resetSortFilterByForNotMineInputs();
        }}
      >
        Reset
      </button>
    </>
  );
};

export default Btns;
