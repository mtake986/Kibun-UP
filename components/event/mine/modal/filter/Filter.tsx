import React from "react";
import SectionTtl from "../SectionTtl";
import Remove from './remove/Remove';
import TagArea from "./tag/TagArea";

const Filter = () => {
  return (
    <div className="space-y-3">
      <SectionTtl text="Filter" />
      <div className="flex items-center gap-3">
        <Remove />
        <TagArea />
      </div>
    </div>
  );
};

export default Filter;
