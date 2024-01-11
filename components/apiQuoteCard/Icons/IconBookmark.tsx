import { useQuote } from "@/context/QuoteContext";
import { displayErrorToast } from "@/functions/displayToast";
import { TypeAPIQuote, TypeUserFromFirestore } from "@/types/type";
import { useCallback, useMemo, useState } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

type Props = {
  q: TypeAPIQuote;
  loginUser: TypeUserFromFirestore;
};

const IconBookmark = ({ q, loginUser }: Props) => {
  const { apiQuotesFromFirestore, handleBookmarkApiQuote } = useQuote();
  const quote = apiQuotesFromFirestore.find((ele) => ele.id === q.id);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(
    quote?.likedBy.includes(loginUser.uid) ?? false
  );
  const [numOfBookmarks, setNumOfBookmarks] = useState<number>(
    quote?.likedBy.length ?? 0
  );
  const heartFill = isBookmarked ? "red" : undefined;
  const handleClick = async () => {
    try {
      if (isBookmarked) {
        setNumOfBookmarks((prev) => prev - 1);
        setIsBookmarked((prev) => !prev);
        await handleBookmarkApiQuote(loginUser.uid, q);
      } else {
        setNumOfBookmarks((prev) => prev + 1);
        setIsBookmarked((prev) => !prev);
        await handleBookmarkApiQuote(loginUser.uid, q);
      }
    } catch (error) {
      displayErrorToast(error);
    }
  };

  return (
    <span
      onClick={handleClick}
      className="flex cursor-pointer items-center gap-1 duration-300 hover:opacity-70"
    >
      {isBookmarked ? (
        <>
          <BsBookmarkFill size={12} className="text-green-500" />
          <span className="text-xs text-green-500">{numOfBookmarks}</span>
        </>
      ) : (
        <>
          <BsBookmark size={12} />
          <span className="text-xs">{numOfBookmarks}</span>
        </>
      )}
    </span>
  );
};

export default IconBookmark;
