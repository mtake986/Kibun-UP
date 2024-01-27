import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Unsubscribe } from "firebase/firestore";
import { twMerge } from "tailwind-merge";

type Props = {
  sortBy: "newestFirst" | "mostVotes";
  sortProposals: (ele: "newestFirst" | "mostVotes") => Unsubscribe;
};
const ElementSelect = ({ sortBy, sortProposals }: Props) => {
  return (
    <Select
      onValueChange={(ele: "mostVotes" | "newestFirst") => {
        console.log(ele);
        sortProposals(ele);
      }}
      value={sortBy}
      defaultValue={sortBy}
    >
      <SelectTrigger className="w-auto text-xs outline-none dark:bg-slate-950">
        <SelectValue placeholder="By" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          value="mostVotes"
          className={twMerge(
            "py-1 text-sm",
          )}
          disabled={sortBy === "mostVotes"}
        >
          Most votes
        </SelectItem>
        <SelectItem
          value="newestFirst"
          className={twMerge(
            "py-1 text-sm",
          )}
          disabled={sortBy === "newestFirst"}
        >
          Newest first
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ElementSelect;
