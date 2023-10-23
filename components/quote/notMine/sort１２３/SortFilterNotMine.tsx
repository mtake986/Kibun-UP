import React from "react";
import OrderSelect from "./OrderSelect";
import ElementSelect from "./ElementSelect";
import { SearchBar } from "./SearchBar";
import Btns from "./Btns";
import OnlySortBtn from "./OnlySortBtn";

const SortFilterNotMine = () => {
  return (
    <>
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
    </>
  );
};

export default SortFilterNotMine;
