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
  const { storeBookmark, removeBookmark } = useQuote();

  const isBookmarked = useMemo(
    () => q.bookmarkedBy.some((id) => id === loginUser.uid),
    [q.bookmarkedBy, loginUser.uid]
  );

  return (
    <span
      onClick={useCallback(() => {
        console.log('renders')
        isBookmarked
          ? removeBookmark(loginUser.uid, q)
          : storeBookmark(loginUser.uid, q);
      }, [isBookmarked, removeBookmark, storeBookmark, loginUser.uid, q])}
      className={`flex cursor-pointer items-center gap-1 duration-300 hover:opacity-50`}
    >
      {isBookmarked ? (
        <BsBookmarkFill size={12} className="text-green-500" />
      ) : (
        <BsBookmark size={12} className="text-green-500" />
      )}
      <span className={`text-green-500`}>{q.bookmarkedBy.length}</span>
    </span>
  );
};

export default IconBookmark;
