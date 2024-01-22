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
  const { updateSortFilterVariablesForMine, SortFilterVariablesForMine } =
    useQuote();

  return (
    <Select
      onValueChange={(ele) => {
        updateSortFilterVariablesForMine("sortBy", ele);
      }}
      value={SortFilterVariablesForMine.sortByElement}
      defaultValue={SortFilterVariablesForMine.sortByElement}
    >
      <SelectTrigger className="w-full text-xs">
        <SelectValue placeholder="By" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="content">Content</SelectItem>
        <SelectItem value="author">Author</SelectItem>
        <SelectItem value="createdAt">Created At</SelectItem>
        <SelectItem value="createdBy">Created By</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ElementSelect;
