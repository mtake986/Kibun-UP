import useQuotesFromQuotableAPI from "@/components/hooks/useQuotesFromQuotableAPI";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { QUOTES_PER_PAGE } from "@/data/CONSTANTS";
import { typeQuotesPerPage } from "@/types/type";

const SelectQuotesPerPage = () => {
  const { updateQuotesPerPage, loginUser } = useAuth();
  // const { handleQuotesPerPage } = useQuotesFromQuotableAPI();

  return (
    <Select
      onValueChange={(value: unknown) => {
        updateQuotesPerPage(Number(value) as typeQuotesPerPage);
        // handleQuotesPerPage(Number(value) as typeQuotesPerPage);
      }}
      value={loginUser?.settings?.apiQuotesPerPage.toString()}
    >
      <SelectTrigger className="w-full xs:max-w-[200px] text-xs">
        <SelectValue
          placeholder="Select Quotes/Page"
        />
      </SelectTrigger>
      <SelectContent>
        {QUOTES_PER_PAGE.map((value) => (
          <SelectItem key={value} value={value.toString()}>
            {value} Qoutes/Page
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectQuotesPerPage;
