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
  const { updateSortFilterByForNotMine, sortFilterByForNotMine } = useQuote();

  return (
    <Select
      onValueChange={(ele) => {
        updateSortFilterByForNotMine("order", ele);
      }}
      value={sortFilterByForNotMine.order}
      defaultValue={sortFilterByForNotMine.order}
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
