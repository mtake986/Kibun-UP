import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEvent } from "@/context/EventContext";

const SelectSortMyEventsOrder = () => {
  const {
    SortFilterVariablesForMyEvents,
    handleSortFilterVariablesMyEventsOrder,
  } = useEvent();

  return (
    <Select
      onValueChange={(ele: "desc" | "asc") => {
        handleSortFilterVariablesMyEventsOrder(ele);
      }}
      value={SortFilterVariablesForMyEvents.order}
      defaultValue={SortFilterVariablesForMyEvents.order}
    >
      <SelectTrigger className="w-full text-xs">
        <SelectValue placeholder="Order" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="desc">Desc.</SelectItem>
        <SelectItem value="asc">Asc.</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectSortMyEventsOrder;
