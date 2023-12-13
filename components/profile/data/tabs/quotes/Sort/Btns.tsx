import { useQuote } from "@/context/QuoteContext";
import React, { useState } from "react";
import { SearchIcon } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { displayErrorToast } from "@/functions/displayToast";
import LoadingSpinnerS from "@/components/utils/LoadingSpinnerS";

type Props = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const Btns = ({ setIsLoading }: Props) => {
  const {
    getLoginUserQuotes,
    sortAndFilterQuotes,
    resetSortVariablesForMineInputs,
  } = useQuote();

  async function handleSortAndFilter() {
    try {
      setIsLoading(true);
      sortAndFilterQuotes();
    } catch (error) {
      displayErrorToast(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }
  async function handleReset() {
    try {
      setIsLoading(true);
      await getLoginUserQuotes();
      resetSortVariablesForMineInputs();
    } catch (error) {
      displayErrorToast(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }

  return (
    <>
      <HoverCard>
        <HoverCardTrigger>
          <button
            className="cursor-pointer rounded-md bg-blue-50 px-3 py-2.5 text-sm text-blue-500 duration-300 ease-in hover:bg-blue-100 dark:bg-blue-700 dark:text-white  dark:hover:bg-blue-600"
            onClick={handleSortAndFilter}
          >
            <SearchIcon size={20} />
          </button>
        </HoverCardTrigger>
        <HoverCardContent className="w-auto px-3 py-2.5 text-center text-sm">
          Sort & Filter
        </HoverCardContent>
      </HoverCard>
      <button
        className="cursor-pointer rounded-md bg-red-50 px-3 py-2.5 text-sm text-red-500 duration-300 ease-in hover:bg-red-100 dark:bg-red-700 dark:text-white  dark:hover:bg-red-600"
        onClick={handleReset}
      >
        Reset
      </button>
    </>
  );
};

export default Btns;
