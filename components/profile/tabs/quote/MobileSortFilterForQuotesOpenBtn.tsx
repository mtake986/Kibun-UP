import { Filter } from "lucide-react";
import { useQuote } from "@/context/QuoteContext";

export default function MobileSortFilterForQuotesOpenBtn() {
  const { sortFilterByForMine, handleSortFilterAreaForMineShown } = useQuote();

  return (
    <div className="cursor-pointer absolute right-0 top-0">
      {/* <span className="absolute -top-2.5 left-[50%] -translate-x-1/2 text-[8px]">
        Mine
      </span> */}
      <Filter
        className={` text-gray-400`}
        size={20}
        onClick={handleSortFilterAreaForMineShown}
      />
      {sortFilterByForMine.order !== "desc" ||
      sortFilterByForMine.sortByElement !== "createdAt" ||
      sortFilterByForMine.searchTag !== "" ? (
        <div className="absolute right-0 top-0 h-1.5 w-1.5 rounded-full bg-red-500"></div>
      ) : null}
    </div>
  );
}
