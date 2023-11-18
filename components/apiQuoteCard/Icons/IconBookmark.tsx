import { useAuth } from "@/context/AuthContext";
import { useQuote } from "@/context/QuoteContext";
import { displayErrorToast } from "@/functions/displayToast";
import { TypeLoginUser, TypeQuote } from "@/types/type";
import { useCallback, useMemo } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

type Props = {
  q: TypeQuote;
  loginUser: TypeLoginUser;
};

const IconBookmark = ({ q, loginUser }: Props) => {
  const { apiQuotesFromFirestore, handleBookmarkApiQuote } = useQuote();

  let numOfBookmarks = 0;
  const isBookmarked = apiQuotesFromFirestore.some((ele) => {
    if (
      ele.id === q.id &&
      ele.bookmarkedBy.some((id) => id === loginUser.uid)
    ) {
      numOfBookmarks = ele.bookmarkedBy.length;
      return true;
    }
  });

  return (
    <span
      onClick={useCallback(() => {
        try {
          handleBookmarkApiQuote(loginUser.uid, q);
        } catch (e) {
          displayErrorToast(e);
        }
      }, [loginUser.uid, q, handleBookmarkApiQuote])}
      className={`flex cursor-pointer items-center gap-1 duration-300 hover:opacity-70`}
    >
      {isBookmarked ? (
        <>
          <BsBookmarkFill size={12} className="text-green-500" />
          <span className={`text-green-500`}>{numOfBookmarks}</span>
        </>
      ) : (
        <>
          <BsBookmark size={12} />
          <span>{numOfBookmarks}</span>
        </>
      )}
    </span>
  );
};

export default IconBookmark;
