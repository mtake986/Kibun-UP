import useQuotesFromQuotableAPI from "@/components/hooks/useQuotesFromQuotableAPI";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QUOTES_PER_PAGE } from "@/data/CONSTANTS";

const SelectQuotesPerPage = () => {
  const { changeQuotesPerPage } = useQuotesFromQuotableAPI();

  return (
    <Select
      onValueChange={(value) => {
        changeQuotesPerPage(value);
      }}
      value={sortFilterByForMine.order}
    >
      <SelectTrigger className="w-full text-xs sm:w-[120px]">
        <SelectValue placeholder="Ex.) Order" />
      </SelectTrigger>
      <SelectContent>
        {QUOTES_PER_PAGE.map((value) => (
          <SelectItem key={value} value={value.toString()}>
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectQuotesPerPage;
