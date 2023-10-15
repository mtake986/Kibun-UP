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
  const { updateSortFilterByForMine, sortFilterByForMine } = useQuote();

  return (
    <Select
      onValueChange={(ele) => {
        updateSortFilterByForMine("order", ele);
      }}
      value={sortFilterByForMine.order}
      defaultValue={sortFilterByForMine.order}
    >
      <SelectTrigger className="w-full text-xs sm:w-[120px]">
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
