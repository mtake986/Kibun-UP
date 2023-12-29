import { useAuth } from "@/context/AuthContext";
import { useQuote } from "@/context/QuoteContext";
import { displayErrorToast } from "@/functions/displayToast";
import { TypeAPIQuote, TypeUserFromFirestore } from "@/types/type";
import { useCallback, useMemo } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

type Props = {
  q: TypeAPIQuote;
  loginUser: TypeUserFromFirestore;
};

const IconBookmark = ({ q, loginUser }: Props) => {
  const { apiQuotesFromFirestore, handleBookmarkApiQuote } = useQuote();

  const { numOfBookmarks, isBookmarked } = useMemo(() => {
    const quote = apiQuotesFromFirestore.find((ele) => ele.id === q.id);
    const isBookmarked = quote?.bookmarkedBy.includes(loginUser.uid) ?? false;
    const numOfBookmarks = quote?.bookmarkedBy.length ?? 0;
    return { numOfBookmarks, isBookmarked };
  }, [apiQuotesFromFirestore, q.id, loginUser.uid]);

  const handleBookmarkClick = useCallback(() => {
    try {
      handleBookmarkApiQuote(loginUser.uid, q);
    } catch (e) {
      displayErrorToast(e);
    }
  }, [loginUser.uid, q, handleBookmarkApiQuote]);

  return (
    <span
      onClick={handleBookmarkClick}
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
