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
  const { updateSortFilterVariablesForMine, SortFilterVariablesForMine } =
    useQuote();

  return (
    <Select
      onValueChange={(ele: TypeSortOrder) => {
        updateSortFilterVariablesForMine("order", ele);
      }}
      value={SortFilterVariablesForMine.order}
      defaultValue={SortFilterVariablesForMine.order}
    >
      <SelectTrigger>
        <SelectValue placeholder="Order" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="asc">Asc.</SelectItem>
        <SelectItem value="desc">Desc.</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default OrderSelect;
