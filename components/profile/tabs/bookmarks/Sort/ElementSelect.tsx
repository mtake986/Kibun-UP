import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuote } from "@/context/QuoteContext";
import { ISortFilterBy } from "@/types/type";

const ElementSelect = () => {
  const { updateSortFilterByForNotMine, sortFilterByForNotMine } = useQuote();

  return (
    <Select
      onValueChange={(ele) => {
        updateSortFilterByForNotMine("sortByElement", ele);
      }}
      value={sortFilterByForNotMine.sortByElement}
      defaultValue={sortFilterByForNotMine.sortByElement}
    >
      <SelectTrigger className="w-full text-xs sm:w-[180px]">
        <SelectValue placeholder="Ex.) By" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="quote">Quote</SelectItem>
        <SelectItem value="author">Author</SelectItem>
        <SelectItem value="createdAt">Created At</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ElementSelect;
