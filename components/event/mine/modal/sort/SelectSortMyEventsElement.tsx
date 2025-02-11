import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEvent } from "@/context/EventContext";

const SelectSortMyEventsElement = () => {
  const {
    sortFilterVariablesForMyEvents,
    handleSortFilterVariablesMyEventsElement,
  } = useEvent();

  return (
    <Select
      onValueChange={(ele) => {
        handleSortFilterVariablesMyEventsElement(ele);
      }}
      value={sortFilterVariablesForMyEvents.sortBy}
      defaultValue={sortFilterVariablesForMyEvents.sortBy}
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

export default SelectSortMyEventsElement;
