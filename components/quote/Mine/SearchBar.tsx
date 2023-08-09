"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuote } from "@/app/context/QuoteContext";
import { SearchIcon } from "lucide-react";
import SortBtn from "./SortBtn";

export function SearchBar() {
  const {
    searchTagForMine,
    setSearchTagForMine,
    fetchFilteredMyQuotes,
    getLoginUserQuotes,
  } = useQuote();
  return (
    <div className="my-2 flex w-full flex-grow justify-between gap-2">
      <SortBtn />
      <Input
        placeholder="Search a tag"
        className="w-full"
        value={searchTagForMine}
        onChange={(e) => {
          setSearchTagForMine(e.target.value);
        }}
      />
      <Button
        className={`flex-none cursor-pointer bg-sky-50 text-sky-500 hover:bg-sky-50 hover:text-sky-500 hover:opacity-70`}
        onClick={fetchFilteredMyQuotes}
      >
        <SearchIcon size={20} />
      </Button>
      <Button
        className={`flex-none cursor-pointer bg-red-50 text-red-500 hover:bg-red-50 hover:text-red-500 hover:opacity-70`}
        onClick={() => {
          setSearchTagForMine("");
          getLoginUserQuotes();
        }}
      >
        All
      </Button>
    </div>
  );
}
