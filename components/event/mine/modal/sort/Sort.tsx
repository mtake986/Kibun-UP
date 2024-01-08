import React from "react";
import SelectSortMineOrder from "./SelectSortMyEventsOrder";
import SelectSortMyEventsElement from "./SelectSortMyEventsElement";
import SectionTtl from "../SectionTtl";

const Sort = () => {
  return (
    <div className="space-y-3">
      <SectionTtl text="Sort" />
      <div className="flex items-center gap-3">
        <SelectSortMyEventsElement />
        <SelectSortMineOrder />
      </div>
    </div>
  );
};

export default Sort;
