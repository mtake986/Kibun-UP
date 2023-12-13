import useFetchTags from "@/components/hooks/useFetchTags";
import { useAuth } from "@/context/AuthContext";
import { TypeTagsQuotableAPI } from "@/types/type";
import { Checkbox } from "@/components/ui/checkbox";
import LoadingSpinnerL from "@/components/utils/LoadingSpinnerL";
import { Input } from "@/components/ui/input";
import { useQuote } from "@/context/QuoteContext";

const SelectTags = () => {
  const { updateSortVariablesForMine, sortVariablesForMine } = useQuote();
  return (
    <Input
      onChange={(e) => {
        updateSortVariablesForMine("tag", e.target.value);
      }}
      placeholder="Ex.) Tag"
      value={sortVariablesForMine.searchTag}
    />
  );
};

export default SelectTags;
