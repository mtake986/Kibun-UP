import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TypeComment, TypeSelectedSortByForComments } from "@/types/type";
import { BiCheck } from "react-icons/bi";

type Props = {
  sortOldestFirst: () => void;
  sortNewestFirst: () => void;
  selectedSortByForComments: TypeSelectedSortByForComments;
};

const SortBtn = ({
  sortOldestFirst,
  sortNewestFirst,
  selectedSortByForComments,
}: Props) => {
  const classNameSelected = "text-sm text-gray-400 ml-2 py-1";
  const classNameNotSelected = "text-sm m-auto ml-7 py-1";

  // todo: refactor DropdownMenuItem; create a function to display items in the dropdown menu
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-sm">Sort By</DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-2 bg-white py-2 dark:bg-slate-900">
        <DropdownMenuItem
          className={
            selectedSortByForComments !== "newestFirst"
              ? "p-0 hover:bg-slate-800"
              : "p-0"
          }
        >
          {selectedSortByForComments === "newestFirst" ? (
            <BiCheck className="ml-1 text-gray-400" size={16} />
          ) : null}
          <button
            disabled={selectedSortByForComments === "newestFirst"}
            className={
              selectedSortByForComments === "newestFirst"
                ? classNameSelected
                : classNameNotSelected
            }
            onClick={sortNewestFirst}
          >
            Newest First
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={
            selectedSortByForComments !== "oldestFirst"
              ? "p-0 hover:bg-slate-800"
              : "p-0"
          }
        >
          {selectedSortByForComments === "oldestFirst" ? (
            <BiCheck className="ml-1 text-gray-400" size={16} />
          ) : null}
          <button
            disabled={selectedSortByForComments === "oldestFirst"}
            className={
              selectedSortByForComments === "oldestFirst"
                ? classNameSelected
                : classNameNotSelected
            }
            onClick={sortOldestFirst}
          >
            Oldest First
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortBtn;
