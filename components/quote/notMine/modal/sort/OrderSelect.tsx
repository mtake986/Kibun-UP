import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuote } from "@/context/QuoteContext";
import { TypeSortOrder } from "@/types/type";

const OrderSelect = () => {
  const { updateSortFilterVariablesForNotMine, SortFilterVariablesForNotMine } =
    useQuote();

  return (
    <Select
      onValueChange={(ele: TypeSortOrder) => {
        updateSortFilterVariablesForNotMine("order", ele);
      }}
      value={SortFilterVariablesForNotMine.order}
      defaultValue={SortFilterVariablesForNotMine.order}
    >
      <SelectTrigger>
        <SelectValue placeholder="Sort Order" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="asc">Asc.</SelectItem>
        <SelectItem value="desc">Desc.</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default OrderSelect;
