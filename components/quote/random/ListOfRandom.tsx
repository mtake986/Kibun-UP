"use client";
import { TypeLoginUser } from "@/types/type";
import { useState } from "react";
import PaginationBtns from "@/components/utils/PaginationBtns";
import NoFetchedData from "@/components/utils/NoFetchedData";
import SortFilterNotMine from "./sort/SortFilterNotMine";
import { useQuote } from "@/context/QuoteContext";
import QuoteCard from "@/components/quoteCard/QuoteCard";
import useQuotesFromQuotableAPI from "@/components/hooks/useQuotesFromQuotableAPI";
import Modal from "./modal/Modal";


type Props = {
  loginUser: TypeLoginUser;
};

const ListOfRandom = ({ loginUser }: Props) => {
  const {
    currentRecords,
    isPending,
    error,
    nPages,
    currentPage,
    setCurrentPage,
    selectedTags,
    handleTags,
  } = useQuotesFromQuotableAPI();

  // const { nPages, currentRecords } = usePagination(currentPage, quotes);
  const { sortFilterAreaForNotMineShown } = useQuote();
  const [isOpen, setIsOpen] = useState(false);

  // if (isPending) {
  //   return <LoadingSpinnerL />;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  if (currentRecords) {
    return (
      <div className="mb-20">
        {sortFilterAreaForNotMineShown ? <SortFilterNotMine /> : null}
        {currentRecords && currentRecords.length >= 1 ? (
          <div className="flex flex-col gap-3">
            {/* Actions */}
            {/* MODAL */}
            <div className="flex items-center justify-between">
            {nPages >= 2 && (
              <PaginationBtns
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
            <Modal selectedTags={selectedTags} handleTags={handleTags} />
            </div>
            {/* List */}
            {currentRecords.map((doc, i) => (
              <QuoteCard key={doc.id} q={doc} />
            ))}
          </div>
        ) : (
          <NoFetchedData text="No quotes found" />
        )}
      </div>
    );
  }
  return <div>No Quotes Found</div>;
};

export default ListOfRandom;
