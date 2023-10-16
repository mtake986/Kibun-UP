"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuote } from "@/context/QuoteContext";
import { SearchIcon } from "lucide-react";

export function SearchBar() {
  const { updateSortFilterByForNotMine, sortFilterByForNotMine } = useQuote();

  return (
    <>
      <Input
        placeholder="Ex.) Search a tag"
        className="w-full text-xs"
        onChange={(e) => {
          updateSortFilterByForNotMine("searchTag", e.target.value);
        }}
        value={sortFilterByForNotMine.searchTag}
      />
    </>
  );
}