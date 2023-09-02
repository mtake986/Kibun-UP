import { useQuote } from "@/context/QuoteContext";
import React from "react";

import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

const Btns = () => {
  const {
    fetchFilteredNotMyQuotes,
    setFilteredNotLoginUserQuotes,
    getQuotesNotMine,
  } = useQuote();

  return (
    <>
      <Button
        className={`flex-none cursor-pointer bg-sky-50 text-sky-500 hover:bg-sky-50 hover:text-sky-500 hover:opacity-70`}
        onClick={() => {
          fetchFilteredNotMyQuotes();
        }}
      >
        <SearchIcon size={20} />
      </Button>
      <Button
        className={`flex-none cursor-pointer bg-red-50 text-red-500 hover:bg-red-50 hover:text-red-500 hover:opacity-70`}
        onClick={() => {
          setFilteredNotLoginUserQuotes([]);
          getQuotesNotMine();
        }}
      >
        Reset
      </Button>
    </>
  );
};

export default Btns;
