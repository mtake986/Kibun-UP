import { useQuote } from "@/context/QuoteContext";
import React from "react";

import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

const Btns = () => {
  const {
    getLoginUserQuotes,
    fetchFilteredMyQuotes,
    setFilteredLoginUserQuotes,
  } = useQuote();

  return (
    <>
      <Button
        className={`cursor-pointer bg-sky-50 text-sky-500 hover:bg-sky-50 hover:text-sky-500 hover:opacity-70`}
        onClick={() => {
          fetchFilteredMyQuotes();
        }}
      >
        <SearchIcon size={20} />
      </Button>
      <Button
        className={`flex-none cursor-pointer bg-red-50 text-red-500 hover:bg-red-50 hover:text-red-500 hover:opacity-70`}
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
