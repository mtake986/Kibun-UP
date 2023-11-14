import useFetchTags from "@/components/hooks/useFetchTags";
import useQuotesFromQuotableAPI from "@/components/hooks/useQuotesFromQuotableAPI";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { TypeTagsQuotableAPI, typeQuotesPerPage } from "@/types/type";

type Props = {
  selectedTags: string[];
  handleTags: (value: string) => void;
}
const SelectTags = ({selectedTags, handleTags}: Props) => {
  const { updateQuotesPerPage, loginUser } = useAuth();
  const { tags, error, isPending } = useFetchTags();

  return (
    <>
      <Select
        onValueChange={(value: string) => {
          handleTags(value);
          // handleQuotesPerPage(Number(value) as typeQuotesPerPage);
        }}
      >
        <SelectTrigger className="w-full text-xs xs:w-[150px]">
          <SelectValue placeholder="Filter by Tag" />
        </SelectTrigger>
        <SelectContent>
          {tags.map((tag: TypeTagsQuotableAPI) => (
            <SelectItem key={tag.name} value={tag.name}>
              {tag.name} - {tag.quoteCount}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedTags.length >= 1 ? (
        <div>{selectedTags.join(' - ')}</div>
      ): null}
    </>
  );
};

export default SelectTags;
