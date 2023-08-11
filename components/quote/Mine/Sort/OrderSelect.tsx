import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuote } from "@/app/context/QuoteContext";

const OrderSelect = () => {
  const { updateSortFilterBy } = useQuote();

  return (
    <Select
      onValueChange={(ele) => {
        updateSortFilterBy("order", ele);
      }}
      // value={ele}
      defaultValue="desc"
    >
      <SelectTrigger className="w-[120px] text-xs">
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
