
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { QUOTES_PER_PAGE } from "@/data/CONSTANTS";
import { TypeQuotesPerPage } from "@/types/type";

const SelectQuotesPerPage = () => {
  const { updateQuotesPerPage, loginUser } = useAuth();

  return (
    <Select
      onValueChange={(value: unknown) => {
        updateQuotesPerPage(Number(value) as TypeQuotesPerPage);
      }}
      value={loginUser?.settings?.apiQuotesPerPage.toString()}
    >
      <SelectTrigger className="w-full text-xs xs:max-w-[200px]">
        <SelectValue placeholder="Select Quotes/Page" />
      </SelectTrigger>
      <SelectContent>
        {QUOTES_PER_PAGE.map((value) => (
          <SelectItem key={value} value={value.toString()}>
            {value} Quotes/Page
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectQuotesPerPage;
