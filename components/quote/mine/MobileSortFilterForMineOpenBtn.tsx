import { Filter } from "lucide-react";
import { useQuote } from "@/context/QuoteContext";

export default function MobileSortFilterForMineOpenBtn() {
  const {
    handleSortFilterAreaForMineShown,
    isSortFilterByForMineDefaultValue,
  } = useQuote();

  return (
    <div className="absolute right-0 top-0 cursor-pointer">
      <Filter
        className={`text-gray-400`}
        size={20}
        onClick={handleSortFilterAreaForMineShown}
      />
      {!isSortFilterByForMineDefaultValue ? (
        <div className="absolute right-0 top-0 h-1.5 w-1.5 rounded-full bg-red-500"></div>
      ) : null}
    </div>
  );
}
