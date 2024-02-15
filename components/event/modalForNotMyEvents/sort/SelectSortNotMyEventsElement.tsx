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

const SelectSortNotMyEventsElement = () => {
  const {
    handleSortFilterVariablesNotMyEventsElement,
    sortFilterVariablesForEventsOtherThanLoginUser,
  } = useEvent();

  return (
    <Select
      onValueChange={(ele) => {
        handleSortFilterVariablesNotMyEventsElement(ele);
      }}
      value={sortFilterVariablesForEventsOtherThanLoginUser.sortBy}
      defaultValue={sortFilterVariablesForEventsOtherThanLoginUser.sortBy}
    >
      <SelectTrigger className="w-full text-xs">
        <SelectValue placeholder="By" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="createdAt">Created At</SelectItem>
        <SelectItem value="eventDate">Event Date</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectSortNotMyEventsElement;
