import { useAuth } from "@/context/AuthContext";
import { useQuote } from "@/context/QuoteContext";
import { displayErrorToast } from "@/functions/displayToast";
import { TypeLoginUser, TypeQuote } from "@/types/type";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

type Props = {
  q: TypeQuote;
  loginUser: TypeLoginUser;
};

const IconBookmark = ({ q, loginUser }: Props) => {
  const { storeBookmark, removeBookmark } = useQuote();

  const isBookmarked = q.likedBy.some((id) => id === loginUser.uid);

  return (
    <span
      onClick={() => {
        isBookmarked
          ? removeBookmark(loginUser.uid, q)
          : storeBookmark(loginUser.uid, q);
      }}
      className={`flex cursor-pointer items-center gap-1 duration-300 hover:opacity-50`}
    >
      {isBookmarked ? (
        <BsBookmarkFill size={12} className="text-green-500" />
      ) : (
        <BsBookmark size={12} className="text-green-500" />
      )}
      <span className={`text-green-500`}>{q.likedBy.length}</span>
    </span>
  );
};

export default IconBookmark;
