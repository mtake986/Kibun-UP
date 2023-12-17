import SectionSubTtl from "../SectionSubTtl";
import SectionTtl from "../SectionTtl";
import TagInput from "./TagInput";

const Filter = () => {
  return (
    <div className="space-y-3">
      <SectionTtl text="Filter" />
      <SectionSubTtl text="Tags" />
      <TagInput />
    </div>
  );
};

export default Filter;
