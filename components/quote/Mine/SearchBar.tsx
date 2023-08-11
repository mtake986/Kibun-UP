"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuote } from "@/app/context/QuoteContext";
import { SearchIcon } from "lucide-react";

export function SearchBar() {
  const {
    updateSortFilterBy,
    getLoginUserQuotes,
    sortFilterByForMine,
    filterLoginUserQuotes,
    fetchFilteredMyQuotes,
  } = useQuote();

  return (
    <div className=" flex w-full flex-grow justify-between gap-2">
      <Input
        placeholder="Search a tag"
        className="w-full text-xs"
        onChange={(e) => {
          updateSortFilterBy("searchTag", e.target.value);
        }}
        value={sortFilterByForMine.searchTag}
      />
      <Button
        className={`flex-none cursor-pointer bg-sky-50 text-sky-500 hover:bg-sky-50 hover:text-sky-500 hover:opacity-70`}
        onClick={() => {
          // getLoginUserQuotes();
          filterLoginUserQuotes();
        }}
      >
        <SearchIcon size={20} />
      </Button>
      <Button
        className={`flex-none cursor-pointer bg-red-50 text-red-500 hover:bg-red-50 hover:text-red-500 hover:opacity-70`}
        onClick={() => {
          updateSortFilterBy("searchTag", "");
          getLoginUserQuotes();
        }}
      >
        All
      </Button>
    </div>
  );
}
