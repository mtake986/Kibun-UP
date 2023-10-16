import QuoteCard from "@/components/quoteCard/QuoteCard";
import { useQuote } from "@/context/QuoteContext";
import React from "react";
import NoData from "../../NoData";

const ListOfLikes = () => {
  const { fetchMyFavs, myFavs } = useQuote();

  return (
    <div>
      {!myFavs || myFavs.quotes?.length === 0 ? (
        <NoData title={'No Likes'} text="You have not liked any quotes yet." />
      ) : (
        myFavs?.quotes?.map((quote) => <QuoteCard key={quote.id} q={quote} />)
      )}
    </div>
  );
};

export default ListOfLikes;
