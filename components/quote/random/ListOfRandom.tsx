"use client";
import { TypeUserFromFirestore } from "@/types/type";
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

    if (currentRecords.length > 0) {
      return (
        <div className="flex flex-col gap-3">
          {currentRecords.map((doc, i) => (
            <ApiQuoteCard
              key={doc.id}
              q={doc}
              selectedAuthors={selectedAuthors}
              handleAuthors={handleAuthors}
            />
          ))}
          {nPages >= 2 && (
            <PaginationBtns
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      );
    } else {
      return <NoFetchedData text="No quotes found" />;
    }
  };

  if (isListOfAuthors) {
    return (
      <ListOfAuthors
        setIsListOfAuthors={setIsListOfAuthors}
        selectedAuthors={selectedAuthors}
        handleAuthors={handleAuthors}
      />
    );
  } else {
    return (
      <div className="mb-20">
        <div className="flex justify-between">
          <p className="text-sm text-gray-400">
            {currentRecords.length} quotes found
          </p>
          <div className="flex gap-3 items-center">
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
        {displayCards()}
      </div>
    );
  }
};

export default ListOfRandom;
