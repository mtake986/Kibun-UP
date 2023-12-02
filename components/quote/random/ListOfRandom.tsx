"use client";
import { TypeLoginUser } from "@/types/type";
import PaginationBtns from "@/components/utils/PaginationBtns";
import useQuotesFromQuotableAPI from "@/components/hooks/useQuotesFromQuotableAPI";
import Modal from "./modal/Modal";
import LoadingSpinnerM from "@/components/utils/LoadingSpinnerM";
import { useEffect, useState } from "react";
import ApiQuoteCard from "@/components/apiQuoteCard/ApiQuoteCard";
import ListOfAuthors from "./authors/ListOfAuthors";
import NoFetchedData from "@/components/utils/NoFetchedData";
import { MdOutlinePerson } from "react-icons/md";


const ListOfRandom = () => {
  const [isListOfAuthors, setIsListOfAuthors] = useState(false);

  const {
    currentRecords,
    isPending,
    error,
    nPages,
    currentPage,
    totalCount,
    setCurrentPage,
    selectedTags,
    handleTags,
    selectedAuthors,
    handleAuthors,
    fetchData,
    andOr,
    handleAndOr,
    sortBy,
    handleSortBy,
  } = useQuotesFromQuotableAPI();
  

  useEffect(() => {
    fetchData({ currentPage, selectedTags, selectedAuthors, andOr, sortBy });
  }, [fetchData, currentPage]);

  const displayCards = () => {
    if (isPending) {
      return <LoadingSpinnerM />;
    }
    if (error) {
      return <div>Error</div>;
    }
    return (
      <div className="flex flex-col gap-3">
        {currentRecords.length > 0 ? (
          currentRecords.map((doc, i) => (
            <ApiQuoteCard
              key={doc.id}
              q={doc}
              selectedAuthors={selectedAuthors}
              handleAuthors={handleAuthors}
            />
          ))
        ) : (
          <NoFetchedData text="No quotes found" />
        )}
      </div>
    );
  };

  if (isListOfAuthors) {
    return <ListOfAuthors setIsListOfAuthors={setIsListOfAuthors} />;
  } else {
    return (
      <div className="mb-20">
        {/* Actions */}
        <div className="flex items-center justify-between">
          {nPages >= 2 && (
            <PaginationBtns
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
          <div className="flex items-center gap-1">
            <MdOutlinePerson
              className="h-6 w-6 cursor-pointer p-1 duration-300 ease-in hover:opacity-70"
              onClick={() => {
                setIsListOfAuthors((prev) => !prev);
              }}
            />

            <Modal
              currentPage={currentPage}
              fetchData={fetchData}
              selectedTags={selectedTags}
              handleTags={handleTags}
              selectedAuthors={selectedAuthors}
              handleAuthors={handleAuthors}
              andOr={andOr}
              handleAndOr={handleAndOr}
              sortBy={sortBy}
              handleSortBy={handleSortBy}
            />
          </div>
        </div>
        <div className="mb-2 flex flex-col gap-3 text-gray-400">
          {totalCount} quotes found
        </div>
        {displayCards()}
      </div>
    );
  }
};

export default ListOfRandom;
