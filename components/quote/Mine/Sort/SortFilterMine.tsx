import React from "react";
import OrderSelect from "./OrderSelect";
import ElementSelect from "./ElementSelect";
import { SearchBar } from "./SearchBar";
import Btns from "./Btns";
import { BiSort } from "react-icons/bi";
import { Button } from "@/components/ui/button";

const SortFilterMine = () => {
  return (
    <div className="my-2 flex flex-col items-center gap-2 sm:hidden sm:flex-row">
      {/* <SortBtn /> */}
      <div className="flex w-full flex-row gap-3">
        <OrderSelect />
        <ElementSelect />
        <Button
          className={`cursor-pointer bg-green-50 text-green-500 hover:bg-green-50 hover:text-green-500 hover:opacity-70`}
          onClick={() => {
            // fetchFilteredMyQuotes();
          }}
        >
          <BiSort size={20} />
        </Button>
      </div>
      <div className=" flex w-full flex-grow justify-between gap-2">
        <SearchBar />
        <Btns />
      </div>
    </div>
  );
};

export default SortFilterMine;
