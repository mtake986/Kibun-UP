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

  const baseStyle = "rounded-md px-3 py-2.5 text-sm duration-300 ease-in";
  const blueBtn = "bg-blue-50 text-blue-500 hover:bg-blue-100";
  const darkModeBlue =
    "dark:bg-blue-700 dark:text-white dark:hover:bg-blue-600";
  const redBtn = "bg-red-50 text-red-500 hover:bg-red-100";
  const darkModeRed =
    "dark:bg-red-700 dark:text-white dark:hover:bg-red-600";

  return (
    <>
      <HoverCard>
        <HoverCardTrigger>
          <button
            className={`${baseStyle} ${blueBtn} ${darkModeBlue}`}
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
        className={`${baseStyle} ${redBtn} ${darkModeRed}`}
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
