import React from "react";
import OrderSelect from "../modal/sort/OrderSelect";
import ElementSelect from "../modal/sort/ElementSelect";
import { SearchBar } from "../modal/filter/SearchBar";
import Btns from "./Btns";
import OnlySortBtn from "./OnlySortBtn";

const SortFilterMine = () => {
  return (
    <div>
    {/* mobile */}
      <div className="mb-3 flex flex-col items-center gap-2 sm:hidden sm:flex-row">
        <div className="flex w-full flex-row gap-3">
          <OrderSelect />
          <ElementSelect />
          <OnlySortBtn />
        </div>
        <div className="flex w-full flex-grow justify-between gap-2">
          <SearchBar />
          <Btns />
        </div>
      </div>
      {/* Tablet */}
      <div className="mb-3 hidden flex-col items-center gap-2 sm:flex sm:flex-row">
        <div className="flex w-full flex-row gap-3">
          <OrderSelect />
          <ElementSelect />
          <OnlySortBtn />
        </div>

        <SearchBar />
        <Btns />
      </div>
    </div>
  );
};

export default SortFilterMine;
