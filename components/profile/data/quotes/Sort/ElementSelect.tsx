import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuote } from "@/context/QuoteContext";

const ElementSelect = () => {
  const { updateSortFilterByForMine, sortFilterByForMine } = useQuote();

  return (
    <Select
      onValueChange={(ele) => {
        updateSortFilterByForMine("sortByElement", ele);
      }}
      value={sortFilterByForMine.sortByElement}
      defaultValue={sortFilterByForMine.sortByElement}
    >
      <SelectTrigger className="w-full text-xs sm:w-[120px]">
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
