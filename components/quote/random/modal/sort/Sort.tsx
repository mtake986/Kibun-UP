import React from 'react'
import SectionTtl from "../SectionTtl";
import SelectSortBy from "./SelectSortBy";
import { TypeSortBy, TypeSortByLabel } from "@/types/type";

type Props = {
  sortBy: TypeSortBy;
  handleSortBy: (value: TypeSortByLabel) => void;
};
const Sort = ({ sortBy, handleSortBy }: Props) => {
  return (
    <div className="space-y-3">
      <SectionTtl text="Sort" />
      <SelectSortBy sortBy={sortBy} handleSortBy={handleSortBy} />
    </div>
  );
};

export default Sort