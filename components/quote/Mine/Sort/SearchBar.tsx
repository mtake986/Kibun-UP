"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuote } from "@/context/QuoteContext";
import { SearchIcon } from "lucide-react";

export function SearchBar() {
  const {
    updateSortFilterByForMine,
    sortFilterByForMine,
  } = useQuote();

  return (
    <>
      <Input
        placeholder="Search a tag"
        className="w-full text-xs"
        onChange={(e) => {
          updateSortFilterByForMine("searchTag", e.target.value);
        }}
        value={sortFilterByForMine.searchTag}
      />
    </>
  );
}
