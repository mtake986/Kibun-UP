import { Checkbox } from "@/components/ui/checkbox";
import { useEvent } from "@/context/EventContext";
import React from "react";

const DisplayOnlyPastEventCheckbox = () => {
  const {
    handleSortFilterVariablesNotMyEventsDisplayOnly,
    sortFilterVariablesForEventsOtherThanLoginUser,
  } = useEvent();

  return (
    <div className="mb-2 flex items-center space-x-2">
      <Checkbox
        id="displayOnlyNotMyPastEventsCheckbox"
        checked={sortFilterVariablesForEventsOtherThanLoginUser.displayOnly.includes(
          "past"
        )}
        onClick={() => {
          handleSortFilterVariablesNotMyEventsDisplayOnly("past");
        }}
      />
      <label
        htmlFor="displayOnlyNotMyPastEventsCheckbox"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Past events
      </label>
    </div>
  );
};

export default DisplayOnlyPastEventCheckbox;
