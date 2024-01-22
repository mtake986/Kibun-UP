import { Checkbox } from "@/components/ui/checkbox";
import { useEvent } from "@/context/EventContext";
import React from "react";

const RemovePastEventCheckbox = () => {
  const {
    handleSortFilterVariablesMyEventsRemove,
    sortFilterVariablesForMyEvents,
  } = useEvent();

  return (
    <div className="mb-2 flex items-center space-x-2">
      <Checkbox
        id="removePastEvents"
        checked={sortFilterVariablesForMyEvents.remove.includes("past")}
        onClick={() => {
          handleSortFilterVariablesMyEventsRemove("past");
        }}
      />
      <label
        htmlFor="removePastEvents"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Past events
      </label>
    </div>
  );
};

export default RemovePastEventCheckbox;
