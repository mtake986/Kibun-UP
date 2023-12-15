import { Input } from "@/components/ui/input";
import { useQuote } from "@/context/QuoteContext";
import { Checkbox } from "@/components/ui/checkbox";

const SelectTags = () => {
  const {
    updateSortVariablesForNotMine,
    sortVariablesForNotMine,
    isTagToFilterNotMyQuotesDisabled,
    setIsTagToFilterNotMyQuotesDisabled,
  } = useQuote();
  return (
    <div>
      <div className="flex items-center space-x-2 mb-2">
        <Checkbox
          id="terms"
          checked={isTagToFilterNotMyQuotesDisabled}
          onClick={() => {
            setIsTagToFilterNotMyQuotesDisabled((prev) => !prev);
          }}
        />
        <label
          htmlFor="terms"
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
          placeholder="Ex.) Tag"
          value={sortVariablesForNotMine.searchTag}
        />
      )}
    </div>
  );
};

export default SelectTags;
