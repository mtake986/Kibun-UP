import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  sortBy: "newestFirst" | "mostVotes";
  setSortBy: React.Dispatch<React.SetStateAction<"newestFirst" | "mostVotes">>;
};
const ElementSelect = ({ sortBy, setSortBy }: Props) => {

  return (
    <Select
      onValueChange={(ele: "mostVotes" | "newestFirst") => {
        setSortBy(ele);
      }}
      value={sortBy}
      defaultValue={sortBy}
    >
      <SelectTrigger className="w-auto text-xs dark:bg-slate-950">
        <SelectValue placeholder="By" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="mostVotes">Most votes</SelectItem>
        <SelectItem value="newestFirst">Newest first</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ElementSelect;
