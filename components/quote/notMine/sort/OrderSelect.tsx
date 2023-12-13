import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuote } from "@/context/QuoteContext";

const OrderSelect = () => {
  const { updateSortVariablesForMine, sortVariablesForMine } = useQuote();

  return (
    <Select
      onValueChange={(ele) => {
        updateSortVariablesForMine("order", ele);
      }}
      value={sortVariablesForMine.order}
      defaultValue={sortVariablesForMine.order}
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
