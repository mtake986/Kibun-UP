"use client";
import { TypeQuote } from "@/types/type";
import { useState } from "react";
import usePagination from "@/components/hooks/usePagination";
import PaginationBtns from "@/components/utils/PaginationBtns";
import NoFetchedData from "@/components/utils/NoFetchedData";
import SortFilterNotMine from "./sort/SortFilterNotMine";
import { useQuote } from "@/context/QuoteContext";
import QuoteCard from "@/components/quoteCard/QuoteCard";

type Props = {
  quotes: TypeQuote[];
};

const ListOfRandom = ({ quotes }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  console.log(quotes.length, quotes)
  const { nPages, currentRecords } = usePagination(currentPage, quotes);

  const { sortFilterAreaForNotMineShown } = useQuote();
  return (
    <div className="mb-20">
      {sortFilterAreaForNotMineShown ? <SortFilterNotMine /> : null}
      {currentRecords && currentRecords.length >= 1 ? (
        <div className="flex flex-col gap-3">
          {currentRecords.map((doc, i) => (
            <QuoteCard key={doc.id} q={doc} />
          ))}
          {nPages >= 2 && (
            <PaginationBtns
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      ) : (
        <NoFetchedData text="No quotes found" />
      )}
    </div>
  );
};

export default ListOfRandom;
