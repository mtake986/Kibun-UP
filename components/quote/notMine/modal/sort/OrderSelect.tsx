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
  const { updateSortVariablesForNotMine, sortVariablesForNotMine } = useQuote();

  return (
    <Select
      onValueChange={(ele: TypeSortOrder) => {
        updateSortVariablesForNotMine("order", ele);
      }}
      value={sortVariablesForNotMine.order}
      defaultValue={sortVariablesForNotMine.order}
    >
      <SelectTrigger>
        <SelectValue placeholder="Ex.) Order" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="asc">Asc.</SelectItem>
        <SelectItem value="desc">Desc.</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default OrderSelect;
