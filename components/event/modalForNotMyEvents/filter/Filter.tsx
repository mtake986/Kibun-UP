import React from "react";
import RemovePastEventCheckbox from "./RemovePastEventCheckbox";
import SectionTtl from "../SectionTtl";

const Filter = () => {
  return (
    <div className="space-y-3">
      <SectionTtl text="Filter" />
      <RemovePastEventCheckbox />
    </div>
  );
};

export default Filter;
