import { Checkbox } from "@/components/ui/checkbox";
import { useEvent } from "@/context/EventContext";
import React from "react";

const RemovePastEventCheckbox = () => {
  const { AreNotMyPastEventsRemoved, setAreNotMyPastEventsRemoved } =
    useEvent();
  return (
    <div className="mb-2 flex items-center space-x-2">
      <Checkbox
        id="disabled"
        checked={AreNotMyPastEventsRemoved}
        onClick={() => {
          setAreNotMyPastEventsRemoved((prev) => !prev);
        }}
      />
      <label
        htmlFor="disabled"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Remove past events
      </label>
    </div>
  );
};

export default RemovePastEventCheckbox;
