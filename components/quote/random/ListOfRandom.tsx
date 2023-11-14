"use client";
import { TypeLoginUser, TypeQuote } from "@/types/type";
import { useState } from "react";
import usePagination from "@/components/hooks/usePagination";
import PaginationBtns from "@/components/utils/PaginationBtns";
import NoFetchedData from "@/components/utils/NoFetchedData";
import SortFilterNotMine from "./sort/SortFilterNotMine";
import { useQuote } from "@/context/QuoteContext";
import QuoteCard from "@/components/quoteCard/QuoteCard";
import useQuotesFromQuotableAPI from "@/components/hooks/useQuotesFromQuotableAPI";
import LoadingSpinnerL from "@/components/utils/LoadingSpinnerL";
import SelectResultPerPage from "./SelectQuotesPerPage";
import SelectTags from "./SelectTags";
import { Settings } from "lucide-react";
import { MdSettings } from "react-icons/md";


type Props = {
  loginUser: TypeLoginUser;
};

const ListOfRandom = ({loginUser}: Props) => {
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
            {/* <Settings className="hover:opacity-70 cursor-pointer hover:rotate-45 duration-300 ease-in" /> */}
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-5">
              {/* Pagination */}
              <div className="flex flex-col gap-1 xs:flex-row xs:items-center xs:justify-between">
                {nPages >= 2 && (
                  <PaginationBtns
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                )}
                <SelectResultPerPage />
              </div>
              {/* Tags for filter */}
              <SelectTags selectedTags={selectedTags} handleTags={handleTags} />
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
