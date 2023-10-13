import { useAuth } from "@/context/AuthContext";
import { useQuote } from "@/context/QuoteContext";
import { TypeLoginUser, TypeQuote } from "@/types/type";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

type Props = {
  q: TypeQuote;
  loginUser: TypeLoginUser;
};

const IconBookmark = ({ q, loginUser }: Props) => {
  const {
    myBookmarks,
    numOfBookmarks,
    storeQuoteInBookmarks,
    removeQuoteFromBookmarks,
  } = useQuote();

  return (
    <span
      onClick={() => {
        try {
          if (myBookmarks && myBookmarks.qids.includes(q.id)) {
            removeQuoteFromBookmarks(loginUser.uid, q);
          } else {
            storeQuoteInBookmarks(loginUser.uid, q);
          }
        } catch (e) {
          console.error(e);
        }
      }}
      className={`flex cursor-pointer items-center gap-1 duration-300 hover:opacity-50`}
    >
      {numOfBookmarks?.some(
        (b) =>
          // b.qid === q.id && b.uids.includes(loginUser.uid)
          b.qid === q.id
      ) ? (
        <>
          {numOfBookmarks.some(
            (b) => b.qid === q.id && b.uids.includes(loginUser.uid)
          ) ? (
            <BsBookmarkFill size={12} className="text-green-500" />
          ) : (
            <BsBookmark size={12} className="text-green-500" />
          )}

          {numOfBookmarks.map((b, i) =>
            b.qid === q.id ? (
              <span key={i} className="text-sm text-green-500">
                {b.uids.length}
              </span>
            ) : null
          )}
        </>
      ) : (
        <>
          <BsBookmark size={12} className="text-green-500" />
          <span className="text-sm text-green-500">0</span>
        </>
      )}
    </span>
  );
};

export default IconBookmark;
