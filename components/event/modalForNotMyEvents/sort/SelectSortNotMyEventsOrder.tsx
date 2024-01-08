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
    handleSortVariablesNotMyEventsOrder,
    sortVariablesForEventsOtherThanLoginUser,
  } = useEvent();

  const searchParams = useSearchParams();
  const currTab = searchParams.get("tab");

  const isMine = currTab !== "notMine";

  return (
    <Select
      onValueChange={(ele: "desc" | "asc") => {
        handleSortVariablesNotMyEventsOrder(ele);
      }}
      value={sortVariablesForEventsOtherThanLoginUser.order}
      defaultValue={sortVariablesForEventsOtherThanLoginUser.order}
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
