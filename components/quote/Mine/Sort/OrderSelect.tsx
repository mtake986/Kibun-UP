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
      <SelectTrigger className="sm:w-[120px] w-full text-xs">
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
