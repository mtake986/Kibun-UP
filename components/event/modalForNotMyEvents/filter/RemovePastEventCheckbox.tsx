import { Checkbox } from "@/components/ui/checkbox";
import { useEvent } from "@/context/EventContext";
import React from "react";

const RemovePastEventCheckbox = () => {
  const { handleSortFilterVariablesMyEventsRemove, sortFilterVariablesForMyEvents } = useEvent();
  return (
    <div className="mb-2 flex items-center space-x-2">
      <Checkbox
        id="removePastEventCheckbox"
        checked={sortFilterVariablesForMyEvents.remove.includes('past')}
        onClick={() => {
          handleSortFilterVariablesMyEventsRemove('past');
        }}
      />
      <label
        htmlFor="removePastEventCheckbox"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Remove past events
      </label>
      {sortFilterVariablesForMyEvents.remove.map((str) => {
        return <span key={str}>{str}</span>
      })}
    </div>
  );
};

export default RemovePastEventCheckbox;
