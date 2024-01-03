import { Input } from "@/components/ui/input";
import { useQuote } from "@/context/QuoteContext";
import { Checkbox } from "@/components/ui/checkbox";

const TagInput = () => {
  const {
    updateSortVariablesForNotMine,
    sortVariablesForNotMine,
    isTagToFilterNotMyQuotesDisabled,
    setIsTagToFilterNotMyQuotesDisabled,
  } = useQuote();
  return (
    <div>
      <div className="mb-2 flex items-center space-x-2">
        <Checkbox
          id="tag-filter-checkbox"
          checked={isTagToFilterNotMyQuotesDisabled}
          onClick={() => {
            setIsTagToFilterNotMyQuotesDisabled((prev) => !prev);
          }}
        />
        <label
          htmlFor="tag-filter-checkbox"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Disabled
        </label>
      </div>
      {isTagToFilterNotMyQuotesDisabled ? null : (
        <Input
          onChange={(e) => {
            updateSortVariablesForNotMine("tag", e.target.value);
          }}
          placeholder="Motivation"
          value={sortVariablesForNotMine.searchTag}
        />
      )}
    </div>
  );
};

export default TagInput;
