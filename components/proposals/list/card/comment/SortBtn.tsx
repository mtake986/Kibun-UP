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
import { ArrowDownNarrowWide } from "lucide-react";
import { IoIosArrowDown } from "react-icons/io";

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
    className={twMerge("p-0", isSelected ? "" : "hover:bg-slate-800")}
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

const dropdownMenuTriggerElement = (selectedSortByForComments: 'newestFirst' | 'oldestFirst') => {
  return (
    <span className="flex items-center gap-3 text-gray-400 outline-none transition-opacity">
      {selectedSortByForComments === "newestFirst"
        ? "Newest First"
        : "Oldest First"}
      <IoIosArrowDown size={16} className="" />
    </span>
  );
}
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
        <DropdownMenuTrigger className="outline-none">
          {dropdownMenuTriggerElement(selectedSortByForComments)}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="space-y-2 bg-white py-2 dark:bg-slate-900 border-none">
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
