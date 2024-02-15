import { Input } from "@/components/ui/input";
import { useQuote } from "@/context/QuoteContext";
import { Checkbox } from "@/components/ui/checkbox";

const TagInput = () => {
  const {
    updateSortFilterVariablesForMine,
    SortFilterVariablesForMine,
    isTagToFilterMyQuotesDisabled,
    setIsTagToFilterMyQuotesDisabled,
  } = useQuote();
  return (
    <div>
      <div className="mb-2 flex items-center space-x-2">
        <Checkbox
          id="disabled"
          checked={isTagToFilterMyQuotesDisabled}
          onClick={() => {
            setIsTagToFilterMyQuotesDisabled((prev) => !prev);
          }}
        />
        <label
          htmlFor="disabled"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Disabled
        </label>
      </div>
      {isTagToFilterMyQuotesDisabled ? null : (
        <Input
          onChange={(e) => {
            updateSortFilterVariablesForMine("tag", e.target.value);
          }}
          placeholder="Motivation"
          value={SortFilterVariablesForMine.searchTag}
        />
      )}
    </div>
  );
};

export default TagInput;
