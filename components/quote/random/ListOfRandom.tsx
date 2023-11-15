"use client";
import { TypeLoginUser } from "@/types/type";
import { useState } from "react";
import PaginationBtns from "@/components/utils/PaginationBtns";
import NoFetchedData from "@/components/utils/NoFetchedData";
import { useQuote } from "@/context/QuoteContext";
import QuoteCard from "@/components/quoteCard/QuoteCard";
import useQuotesFromQuotableAPI from "@/components/hooks/useQuotesFromQuotableAPI";
import Modal from "./modal/Modal";
import LoadingSpinnerM from "@/components/utils/LoadingSpinnerM";
import { Input } from "@/components/ui/input";

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
    totalCount,
    setCurrentPage,
    selectedTags,
    handleTags,
    selectedAuthors,
    handleAuthors,
    fetchData,
    andOr,
    handleAndOr,
  } = useQuotesFromQuotableAPI();

  if (isPending) {
    return <LoadingSpinnerM />;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="mb-20">
      {currentRecords?.length > 0 ? (
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
            <Modal
              selectedTags={selectedTags}
              currentPage={currentPage}
              selectedAuthors={selectedAuthors}
              andOr={andOr}
              handleAndOr={handleAndOr}
              handleTags={handleTags}
              fetchData={fetchData}
            />
          </div>
          {/* List */}
          <div className="flex flex-col gap-3 text-gray-400">
            {totalCount} quotes found
          </div>
          {currentRecords.map((doc, i) => (
            <QuoteCard
              key={doc.id}
              q={doc}
              selectedAuthors={selectedAuthors}
              handleAuthors={handleAuthors}
            />
          ))}
        </div>
      ) : (
        <NoFetchedData text="No quotes found" />
      )}
    </div>
  );
};

export default ListOfRandom;
