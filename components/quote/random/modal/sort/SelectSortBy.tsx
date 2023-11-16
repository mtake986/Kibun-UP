import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SORT_BYS } from "@/data/CONSTANTS";
import { TypeSortBy, TypeSortByLabel } from "@/types/type";

type Props = {
  sortBy: TypeSortBy;
  handleSortBy: (value: TypeSortByLabel) => void;
};
const SelectSortBy = ({ sortBy, handleSortBy }: Props) => {
  return (
    <Select
      onValueChange={(value: TypeSortByLabel) => {
        handleSortBy(value);
      }}
      value={sortBy.label}
      defaultValue={sortBy.label}
    >
      <SelectTrigger className="w-full text-xs xs:max-w-[200px]">
        <SelectValue placeholder="Select And/Or" />
      </SelectTrigger>
      <SelectContent>
        {SORT_BYS.map((ele) => (
          <SelectItem key={ele.label} value={ele.label}>
            {ele.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectSortBy;
