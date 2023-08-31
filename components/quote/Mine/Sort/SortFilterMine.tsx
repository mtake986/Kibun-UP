import React from "react";
import OrderSelect from "./OrderSelect";
import ElementSelect from "./ElementSelect";
import { SearchBar } from "./SearchBar";
import { useQuote } from "@/context/QuoteContext";

import { Button } from "@/components/ui/button";

import { SearchIcon } from "lucide-react";
import Btns from "./Btns";

const SortFilterMine = () => {
  const {
    getLoginUserQuotes,
    fetchFilteredMyQuotes,
    setFilteredLoginUserQuotes,
  } = useQuote();

  return (
    <div className="my-2 sm:hidden flex-col items-center gap-2 flex sm:flex-row">
      {/* <SortBtn /> */}
      <div className="flex w-full flex-row gap-3">
        <OrderSelect />
        <ElementSelect />
      </div>
      <div className=" flex w-full flex-grow justify-between gap-2">
        <SearchBar />
        <Btns />
      </div>
    </div>
  );
};

export default SortFilterMine;
