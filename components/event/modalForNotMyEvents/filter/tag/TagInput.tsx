import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useEvent } from "@/context/EventContext";

const TagInput = () => {
  const {
    handleSortFilterVariablesMyEventsTagDisabled,
    sortFilterVariablesForMyEvents,
    handleSortFilterVariablesMyEventsSearchTagName,
  } = useEvent();

  return (
    <div>
      <div className="mb-2 flex items-center space-x-2">
        <Checkbox
          id="tagDisabled"
          checked={sortFilterVariablesForMyEvents.isTagDisabled}
          onClick={() => {
            handleSortFilterVariablesMyEventsTagDisabled();
          }}
        />
        <label
          htmlFor="tagDisabled"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Disabled
        </label>
      </div>
      <Input
        onChange={(e) => {
          handleSortFilterVariablesMyEventsSearchTagName(e.target.value);
        }}
        placeholder="Motivation"
        value={sortFilterVariablesForMyEvents.searchTagName}
        disabled={sortFilterVariablesForMyEvents.isTagDisabled}
      />
    </div>
  );
};

export default TagInput;
