"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuote } from "@/context/QuoteContext";
import { SearchIcon } from "lucide-react";

export function SearchBar() {
  const { updateSortVariablesForMine, sortVariablesForMine } = useQuote();

  return (
    <Input
      placeholder="Ex.) Search a tag"
      className="w-full text-xs"
      onChange={(e) => {
        updateSortVariablesForMine("searchTag", e.target.value);
      }}
      value={sortVariablesForMine.searchTag}
    />
  );
}
