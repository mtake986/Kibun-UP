import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TypeSelectedSortByForComments } from "@/types/type";
import { BiCheck } from "react-icons/bi";

type Props = {
  sortOldestFirst: () => void;
  sortNewestFirst: () => void;
  selectedSortByForComments: TypeSelectedSortByForComments;
};

const SortOption = ({
  label,
  onClick,
  isSelected,
}: {
  label: string;
  onClick: () => void;
  isSelected: boolean;
}) => (
  <DropdownMenuItem className={`p-0 ${isSelected ? "hover:bg-slate-800" : ""}`}>
    {isSelected && <BiCheck className="mr-1 text-gray-400" size={16} />}
    <button
      disabled={isSelected}
      className={`text-sm ${isSelected ? "text-gray-400" : "m-auto ml-5"} py-1`}
      onClick={onClick}
    >
      {label}
    </button>
  </DropdownMenuItem>
);

const SortBtn = ({
  sortOldestFirst,
  sortNewestFirst,
  selectedSortByForComments,
}: Props) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="text-sm">Sort By</DropdownMenuTrigger>
    <DropdownMenuContent className="space-y-2 bg-white py-2 dark:bg-slate-900">
      <SortOption
        label="Newest First"
        onClick={sortNewestFirst}
        isSelected={selectedSortByForComments === "newestFirst"}
      />
      <SortOption
        label="Oldest First"
        onClick={sortOldestFirst}
        isSelected={selectedSortByForComments === "oldestFirst"}
      />
    </DropdownMenuContent>
  </DropdownMenu>
);

export default SortBtn;
