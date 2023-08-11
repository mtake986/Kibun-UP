import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuote } from "@/app/context/QuoteContext";
import { ISortFilterBy } from "@/types/type";

const ElementSelect = () => {
  const { updateSortFilterBy } = useQuote();

  return (
    <Select
      onValueChange={(ele) => {
        updateSortFilterBy('sortByElement', ele)
      }}
      // value={ele}
      defaultValue='createdAt'
    >
      <SelectTrigger className="w-[180px] text-xs">
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
