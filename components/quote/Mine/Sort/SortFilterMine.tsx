import React from "react";
import OrderSelect from "./OrderSelect";
import ElementSelect from "./ElementSelect";
import { SearchBar } from "./SearchBar";
import Btns from "./Btns";
import OnlySortBtn from "./OnlySortBtn";

const SortFilterMine = () => {
  return (
    <>
      <div className="my-2 flex flex-col items-center gap-2 sm:hidden sm:flex-row">
        {/* <SortBtn /> */}
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
      <div className="my-2 hidden flex-col items-center gap-2 sm:flex sm:flex-row">
        {/* <SortBtn /> */}
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

export default SortFilterMine;
