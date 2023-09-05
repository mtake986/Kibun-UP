import { Filter } from "lucide-react";
import { useQuote } from "@/context/QuoteContext";

export default function MobileSortFilterForNotMineOpenBtn() {
  const { sortFilterByForNotMine, handleSortFilterAreaForNotMineShown } =
    useQuote();

  return (
    <div className="cursor-pointer absolute right-0 top-0">
      {/* <span className="left-[50%] -translate-x-1/2 -top-2.5 text-[8px] absolute">All</span> */}
      <Filter
        className={` text-gray-400 sm:hidden`}
        size={20}
        onClick={handleSortFilterAreaForNotMineShown}
      />
      {sortFilterByForNotMine.order !== "desc" ||
      sortFilterByForNotMine.sortByElement !== "createdAt" ||
      sortFilterByForNotMine.searchTag !== "" ? (
        <div className="absolute right-0 top-0 h-1.5 w-1.5 rounded-full bg-red-500"></div>
      ) : null}
    </div>
  );
}
