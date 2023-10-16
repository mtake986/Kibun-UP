import QuoteCard from "@/components/quoteCard/QuoteCard";
import { useQuote } from "@/context/QuoteContext";
import React, { useState } from "react";
import NoFetchedData from "@/components/utils/NoFetchedData";
import PaginationBtns from "@/components/utils/PaginationBtns";
import usePagination from "@/components/hooks/usePagination";

const ListOfLikes = () => {
  const { myFavs } = useQuote();

  // return (
  //   <div>
  //     {!myFavs || myFavs.quotes?.length === 0 ? (
  //       <NoData title={'No Likes'} text="You have not liked any quotes yet." />
  //     ) : (
  //       myFavs?.quotes?.map((quote) => <QuoteCard key={quote.id} q={quote} />)
  //     )}
  //   </div>
  // );

  const [currentPage, setCurrentPage] = useState(1);

  console.log(myFavs.quotes)
  
  const { nPages, currentRecords } = usePagination(currentPage, myFavs.quotes);

  if (!myFavs || myFavs.quotes?.length === 0) {
    return (
      <NoFetchedData
        title={"No Likes"}
        text="You have not liked any quotes yet."
      />
    );
  } else {
    console.log(currentRecords)
    return (
      <div className="mb-20">
        {currentRecords && currentRecords.length >= 1 ? (
          <>
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
          </>
        ) : (
          <NoFetchedData
            title="No Quotes"
            text="You ain't liked any quotes yet."
          />
        )}
      </div>
    );
  }
};

export default ListOfLikes;
