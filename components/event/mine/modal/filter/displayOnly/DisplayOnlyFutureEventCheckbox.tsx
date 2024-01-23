import { Checkbox } from "@/components/ui/checkbox";
import { useEvent } from "@/context/EventContext";
import React from "react";

const DisplayOnlyFutureEventCheckbox = () => {
  const {
    handleSortFilterVariablesMyEventsDisplayOnly,
    sortFilterVariablesForMyEvents,
  } = useEvent();
  return (
    <div className="mb-2 flex items-center space-x-2">
      <Checkbox
        id="displayOnlyMyFutureEventsCheckbox"
        checked={sortFilterVariablesForMyEvents.displayOnly.includes("future")}
        onClick={() => {
          handleSortFilterVariablesMyEventsDisplayOnly("future");
        }}
      />
      <label
        htmlFor="displayOnlyMyFutureEventsCheckbox"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Future events
      </label>
    </div>
  );
};

export default DisplayOnlyFutureEventCheckbox;
