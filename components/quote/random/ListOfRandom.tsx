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

  if (isPending) {
    return <LoadingSpinnerM />;
  }
  if (error) {
    return <div>{error}</div>;
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
};

export default ListOfRandom;
