import { useAuth } from "@/context/AuthContext";
import { useQuote } from "@/context/QuoteContext";
import { displayErrorToast } from "@/functions/displayToast";
import { TypeUserFromFirestore, TypeQuote } from "@/types/type";
import { useCallback, useMemo, useState } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

type Props = {
  q: TypeQuote;
  loginUser: TypeUserFromFirestore;
};

const IconBookmark = ({ q, loginUser }: Props) => {
  const { storeBookmark, removeBookmark, allQuotes } = useQuote();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [numOfBookmarks, setNumOfBookmarks] = useState<number>(
    q.bookmarkedBy?.length
  );
  const [isBookmarked, setIsBookmarked] = useState<boolean>(
    q.bookmarkedBy?.includes(loginUser.uid)
  );

  const handleClick = useCallback(() => {
    try {
      if (isBookmarked) {
        setNumOfBookmarks((prev) => prev - 1);
        setIsBookmarked((prev) => !prev);
        removeBookmark(loginUser.uid, q)
      }
      else {
        setNumOfBookmarks((prev) => prev + 1);
        setIsBookmarked((prev) => !prev);
        storeBookmark(loginUser.uid, q);
      }
    } catch (e) {
      displayErrorToast(e);
    }
  }, [isBookmarked, removeBookmark, storeBookmark, loginUser.uid, q]);

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
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
    </button>
  );
};

export default IconBookmark;
