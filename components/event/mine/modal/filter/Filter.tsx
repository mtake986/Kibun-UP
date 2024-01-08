import React from "react";
import SectionSubTtl from "../SectionSubTtl";
import SectionTtl from "../SectionTtl";
import RemovePastEventCheckbox from "./RemovePastEventCheckbox";

const Filter = () => {
  return (
    <div className="space-y-3">
      <SectionTtl text="Filter" />
      <RemovePastEventCheckbox />
    </div>
  );
};

export default Filter;
