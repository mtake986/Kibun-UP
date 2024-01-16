import React from "react";
import SectionSubTtl from "../SectionSubTtl";
import SectionTtl from "../SectionTtl";
import RemovePastEventCheckbox from "./RemovePastEventCheckbox";
import TagInput from "./TagInput";

const Filter = () => {
  return (
    <div className="space-y-3">
      <SectionTtl text="Filter" />
      <RemovePastEventCheckbox />
      <SectionSubTtl text="Tags" />
      <TagInput />
    </div>
  );
};

export default Filter;
