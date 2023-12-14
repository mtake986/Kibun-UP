import React from "react";
import SectionTtl from "../SectionTtl";
import ElementSelect from "./ElementSelect";
import OrderSelect from "./OrderSelect";

const Sort = () => {
  return (
    <div className="space-y-3">
      <SectionTtl text="Sort" />
      <div className="flex gap-3 items-center">
        <ElementSelect />
        <OrderSelect />
      </div>
    </div>
  );
};

export default Sort;
