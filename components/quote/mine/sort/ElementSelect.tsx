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
      <SelectTrigger className="sm:w-[120px] w-full text-xs">
        <SelectValue placeholder="By" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="quote">Quote</SelectItem>
        <SelectItem value="person">Person</SelectItem>
        <SelectItem value="createdAt">Created At</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ElementSelect;
