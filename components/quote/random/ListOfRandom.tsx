"use client";
import { TypeLoginUser } from "@/types/type";
import PaginationBtns from "@/components/utils/PaginationBtns";
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

  if (isPending) {
    return <LoadingSpinnerM />;
  }
  if (error) {
    return <div>Error</div>;
  }

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
      <div className="mb-2 flex flex-col gap-3 text-gray-400">
        {totalCount} quotes found
      </div>
      {/* {currentRecords?.length > 0 ? ( */}
      <div className="flex flex-col gap-3">
        {currentRecords.map((doc, i) => (
          <QuoteCard
            key={doc.id}
            q={doc}
            selectedAuthors={selectedAuthors}
            handleAuthors={handleAuthors}
          />
        ))}
      </div>
      {/* ) : (
        <NoFetchedData text="No quotes found" />
      )} */}
    </div>
  );
};

export default ListOfRandom;
