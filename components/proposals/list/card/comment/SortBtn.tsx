import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TypeComment, TypeSelectedSortByForComments } from "@/types/type";
import { BiCheck } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import { Unsubscribe } from "firebase/firestore";

type Props = {
  // selectedSortByForComments: TypeSelectedSortByForComments;
  commentsOnProposal: TypeComment[];
  sortByNewestFirst: () => Unsubscribe;
  sortByOldestFirst: () => Unsubscribe;
  selectedSortByForComments: TypeSelectedSortByForComments;
  setSelectedSortByForComments: React.Dispatch<
    React.SetStateAction<TypeSelectedSortByForComments>
  >;
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
  <DropdownMenuItem
    className={twMerge("p-0", isSelected ? "hover:bg-slate-800" : "")}
  >
    {isSelected && <BiCheck className="mr-1 text-gray-400" size={16} />}
    <button
      disabled={isSelected}
      className={twMerge(
        "py-1 text-sm",
        isSelected ? "text-gray-400" : "m-auto ml-5"
      )}
      onClick={onClick}
    >
      {label}
    </button>
  </DropdownMenuItem>
);

const SortBtn = ({
  commentsOnProposal,
  sortByNewestFirst,
  sortByOldestFirst,
  selectedSortByForComments,
  setSelectedSortByForComments
}: Props) => {
  if (commentsOnProposal.length >= 2) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="text-sm text-gray-400">
          {selectedSortByForComments}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="space-y-2 bg-white py-2 dark:bg-slate-900">
          <SortOption
            label="Newest First"
            onClick={() => {
              sortByNewestFirst();
              setSelectedSortByForComments("newestFirst");
            }}
            isSelected={selectedSortByForComments === "newestFirst"}
          />
          <SortOption
            label="Oldest First"
            onClick={() => {
              sortByOldestFirst();
              setSelectedSortByForComments("oldestFirst");
            }}
            isSelected={selectedSortByForComments === "oldestFirst"}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else {
    return null;
  }
};

export default SortBtn;
