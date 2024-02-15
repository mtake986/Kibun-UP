import useFetchTags from "@/components/hooks/useFetchTags";
import { useAuth } from "@/context/AuthContext";
import { TypeTagsQuotableAPI } from "@/types/type";
import { Checkbox } from "@/components/ui/checkbox";
import LoadingSpinnerL from "@/components/utils/LoadingSpinnerL";

type Props = {
  selectedTags: string[];
  handleTags: (value: string) => void;
};
const SelectTags = ({ selectedTags, handleTags }: Props) => {

  const { tags, error, isPending } = useFetchTags();

  if (isPending) {
    return <LoadingSpinnerL />;
  }
  return (
    <div>
      {/* <p className="mb-1">
        {selectedTags.length} of {tags.length} selected
      </p> */}
      <div className="flex h-24 flex-wrap gap-3 overflow-scroll">
        {tags.map((tag: TypeTagsQuotableAPI) => (
          <div key={tag.name} className="flex items-center space-x-2 mr-2">
            <Checkbox
              id={tag.name}
              onClick={() => {
                handleTags(tag.name);
              }}
              checked={isPending ? false : selectedTags.includes(tag.name)}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor={tag.name}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {tag.name} ({tag.quoteCount})
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectTags;
