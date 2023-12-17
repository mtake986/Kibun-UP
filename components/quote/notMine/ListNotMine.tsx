"use client";
import { TypeQuote } from "@/types/type";
import { useState } from "react";
import usePagination from "@/components/hooks/usePagination";
import PaginationBtns from "@/components/utils/PaginationBtns";
import NoFetchedData from "@/components/utils/NoFetchedData";
import QuoteCard from "@/components/quoteCard/QuoteCard";
import Modal from "./modal/Modal";

type Props = {
  quotes: TypeQuote[];
};

const ListNotMine = ({ quotes }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { nPages, currentRecords } = usePagination(currentPage, quotes);

  return (
    <div className="mb-20">
      <div className="flex items-center justify-between">
        {nPages >= 2 && (
          <PaginationBtns
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
        <Modal />
      </div>
      <div className="mb-2 flex flex-col gap-3 text-gray-400">
        {quotes.length} quotes found
      </div>
      {currentRecords.length >= 1 ? (
        <div className="flex flex-col gap-3">
          {currentRecords.map((doc, i) => (
            <QuoteCard key={doc.id} q={doc} />
          ))}
        </div>
      ) : (
        <NoFetchedData text="No quotes found" />
      )}
    </div>
  );
};

export default ListNotMine;
