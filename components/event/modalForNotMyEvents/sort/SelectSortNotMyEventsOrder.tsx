import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEvent } from "@/context/EventContext";
import { useSearchParams } from "next/navigation";

const SelectSortNotMyEventsOrder = () => {
  const {
    handleSortFilterVariablesNotMyEventsOrder,
    sortFilterVariablesForEventsOtherThanLoginUser,
  } = useEvent();

  const searchParams = useSearchParams();
  const currTab = searchParams.get("tab");

  const isMine = currTab !== "notMine";

  return (
    <Select
      onValueChange={(ele: "desc" | "asc") => {
        handleSortFilterVariablesNotMyEventsOrder(ele);
      }}
      value={sortFilterVariablesForEventsOtherThanLoginUser.order}
      defaultValue={sortFilterVariablesForEventsOtherThanLoginUser.order}
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

export default SelectSortNotMyEventsOrder;
