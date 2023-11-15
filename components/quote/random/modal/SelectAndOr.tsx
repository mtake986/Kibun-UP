import useQuotesFromQuotableAPI from "@/components/hooks/useQuotesFromQuotableAPI";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { AND_OR, QUOTES_PER_PAGE } from "@/data/CONSTANTS";
import { TypeAndOr, TypeQuotesPerPage } from "@/types/type";

type Props = {
  andOr: TypeAndOr;
  handleAndOr: (value: 'and' | 'or') => void;
}
const SelectAndOr = ({andOr, handleAndOr}: Props) => {
  const { updateQuotesPerPage, loginUser } = useAuth();
  // const { andOr, setAndOr } = useQuotesFromQuotableAPI();
  return (
    <Select
      onValueChange={(value: "and" | "or") => {
        handleAndOr(value);
      }}
      value={andOr.label}
      defaultValue={andOr.label}
    >
      <SelectTrigger className="w-full text-xs xs:max-w-[200px]">
        <SelectValue placeholder="Select Quotes/Page" />
      </SelectTrigger>
      <SelectContent>
        {AND_OR.map((ele) => (
          <SelectItem key={ele.label} value={ele.label}>
            {ele.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectAndOr;
