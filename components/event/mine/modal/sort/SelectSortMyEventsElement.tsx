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
  const { sortVariablesForMyEvents, handleSortVariablesMyEventsElement } =
    useEvent();

  return (
    <Select
      onValueChange={(ele) => {
        handleSortVariablesMyEventsElement(ele);
      }}
      value={sortVariablesForMyEvents.element}
      defaultValue={sortVariablesForMyEvents.element}
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
