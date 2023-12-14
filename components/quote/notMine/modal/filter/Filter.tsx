import SectionSubTtl from "../SectionSubTtl";
import SelectTags from "./SelectTags";
import SectionTtl from "../SectionTtl";

const Filter = () => {
  return (
    <div className="space-y-3">
      <SectionTtl text="Filter" />
      <SectionSubTtl text="Tags" />
      <SelectTags />
    </div>
  );
};

export default Filter;
