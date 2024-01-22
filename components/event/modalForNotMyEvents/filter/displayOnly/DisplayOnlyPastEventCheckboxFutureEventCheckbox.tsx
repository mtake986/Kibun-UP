import { Checkbox } from "@/components/ui/checkbox";
import { useEvent } from "@/context/EventContext";
import React from "react";

const DisplayOnlyPastEventCheckboxFutureEventCheckbox = () => {
  const {
    handleSortFilterVariablesNotMyEventsRemove,
    sortFilterVariablesForEventsOtherThanLoginUser,
  } = useEvent();

  return (
    <div className="mb-2 flex items-center space-x-2">
      <Checkbox
        id="removeFutureEventsCheckbox"
        checked={sortFilterVariablesForEventsOtherThanLoginUser.displayOnly.includes(
          "future"
        )}
        onClick={() => {
          handleSortFilterVariablesNotMyEventsRemove("future");
        }}
      />
      <label
        htmlFor="removeFutureEventsCheckbox"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Future events
      </label>
    </div>
  );
};

export default DisplayOnlyPastEventCheckboxFutureEventCheckbox;
