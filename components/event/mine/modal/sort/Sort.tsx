import React from "react";
import SelectSortMineOrder from "./SelectSortMyEventsOrder";
import SelectSortMyEventsElement from "./SelectSortMyEventsElement";

const Sort = () => {
  return (
    <div className="flex items-center gap-3">
      <SelectSortMyEventsElement />
      <SelectSortMineOrder />
    </div>
  );
};

export default Sort;
