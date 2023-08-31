
import { Filter } from "lucide-react";
import { useQuote } from "@/context/QuoteContext";

export default function ModalOpenBtn() {

  const { whichList, handleSortFilterAreaForMineShown, handleSortFilterAreaForNotMineShown } = useQuote();

  return (
    <>
      <Filter
        className="absolute right-0 top-0 text-gray-400 sm:hidden"
        size={20}
        onClick={
          whichList === "yours"
            ? handleSortFilterAreaForMineShown
            : handleSortFilterAreaForNotMineShown
        }
      />
    </>
  );
}
