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
  const { storeBookmark, removeBookmark, allQuotes } = useQuote();

const numOfBookmarks = useMemo(() => {
  const quote = allQuotes.find((ele) => ele.id === q.id);
  return quote ? quote.bookmarkedBy.length : 0;
}, [allQuotes, q.id]);
const isBookmarked = useMemo(() => {
  return allQuotes.some(
    (ele) => ele.id === q.id && ele.bookmarkedBy.includes(loginUser.uid)
  );
}, [allQuotes, q.id, loginUser.uid]);

const handleClick = useCallback(() => {
  try {
    isBookmarked
      ? removeBookmark(loginUser.uid, q)
      : storeBookmark(loginUser.uid, q);
  } catch (e) {
    displayErrorToast(e);
  }
}, [isBookmarked, removeBookmark, storeBookmark, loginUser.uid, q]);

  return (
    <span
      onClick={handleClick}
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
