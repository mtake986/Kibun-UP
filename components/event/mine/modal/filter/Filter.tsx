import React from "react";
import SectionTtl from "../SectionTtl";
import TagArea from "./tag/TagArea";
import DisplayOnly from "./displayOnly/DisplayOnly";

const Filter = () => {
  return (
    <div className="space-y-3">
      <SectionTtl text="Filter" />
      <div className="flex items-start gap-3">
        <DisplayOnly />
        <TagArea />
      </div>
    </div>
  );
};

export default Filter;
