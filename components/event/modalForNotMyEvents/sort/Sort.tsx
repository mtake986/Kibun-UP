import React from "react";
import SelectSortNotMyEventsElement from "./SelectSortNotMyEventsElement";
import SelectSortNotMyEventsOrder from "./SelectSortNotMyEventsOrder";

const Sort = () => {
  return (
    <div className="flex items-center gap-3">
      <SelectSortNotMyEventsElement />
      <SelectSortNotMyEventsOrder />
    </div>
  );
};

export default Sort;
