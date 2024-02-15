import React from "react";
import SelectSortNotMyEventsElement from "./SelectSortNotMyEventsElement";
import SelectSortNotMyEventsOrder from "./SelectSortNotMyEventsOrder";
import SectionTtl from "../SectionTtl";

const Sort = () => {
  return (
    <div className="space-y-3">
      <SectionTtl text="Sort" />
      <div className="flex items-center gap-3">
        <SelectSortNotMyEventsElement />
        <SelectSortNotMyEventsOrder />
      </div>
    </div>
  );
};

export default Sort;
