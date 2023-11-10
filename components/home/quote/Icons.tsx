import { useQuote } from "@/context/QuoteContext";
import { displayErrorToast } from "@/functions/displayToast";
import { TypeLoginUser, TypeQuote } from "@/types/type";
import { Heart } from "lucide-react";
import { useCallback } from "react";
import { BiLockOpen, BiLock, BiRefresh } from "react-icons/bi";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { usePathname } from "next/navigation";

type Props = {
  quote: TypeQuote;
  type: "locked" | "appChoice" | "notAppChoice";
  refetch?: () => void;
  loginUser: TypeLoginUser;
};
const Icons = ({ quote, type, refetch, loginUser }: Props) => {
  const {
    removeLockFromThisQuote,
    lockThisQuote,
    updateRandomQuote,
    storeFav,
    removeFav,
    storeBookmark,
    removeBookmark,
  } = useQuote();
  const pathname = usePathname();

  const isLiked = quote.likedBy?.some((id) => id === loginUser.uid);
  const isBookmarked = quote.bookmarkedBy?.some((id) => id === loginUser.uid);

  const heartFill = isLiked ? "red" : undefined;
  const bookmarkFill = isBookmarked ? "green" : undefined;

  return (
    <div className="flex cursor-pointer items-center justify-end gap-3">
      <BiRefresh
        size={20}
        onClick={() => {
          if (type === "locked") {
            alert("To refresh, unlock this quote first.");
          } else if (type === "appChoice") {
            if (refetch) refetch();
          } else {
            updateRandomQuote();
          }
        }}
        className={`${
          type === "locked"
            ? "cursor-not-allowed opacity-30 duration-300"
            : "cursor-pointer duration-300 hover:opacity-50"
        }`}
      />
      {type === "locked" ? (
        <BiLock
          size={16}
          onClick={() => {
            if (loginUser) {
              if (type === "locked") {
                removeLockFromThisQuote(loginUser.uid);
              } else {
                lockThisQuote(loginUser.uid, quote as any);
              }
            }
          }}
          className={`text-red-500  duration-300 hover:text-red-500 hover:opacity-50`}
        />
      ) : (
        <BiLockOpen
          size={16}
          onClick={() => {
            if (loginUser) {
              lockThisQuote(loginUser.uid, quote as any);
            }
          }}
          className="cursor-pointer duration-300 hover:opacity-50"
        />
      )}

      {/* {!pathname.includes("home") ? (
        <>
          <span
            onClick={() => {
              isLiked
                ? removeFav(loginUser.uid, quote)
                : storeFav(loginUser.uid, quote);
            }}
            className={`flex cursor-pointer items-center gap-1 duration-300 hover:opacity-70`}
          >
            {isLiked ? (
              <>
                <Heart size={14} className="text-red-500" fill={heartFill} />
                <span className={`text-red-500`}>{quote.likedBy?.length}</span>
              </>
            ) : (
              <>
                <Heart size={14} />
                <span>{quote.likedBy?.length || 0}</span>
              </>
            )}
          </span>

          <span
            onClick={() => {
              try {
                if (isBookmarked) {
                  removeBookmark(loginUser.uid, quote);
                  console.log(
                    "remove bookmark",
                    quote.id,
                    quote.bookmarkedBy,
                    loginUser.uid
                  );
                } else {
                  storeBookmark(loginUser.uid, quote);
                  console.log(
                    "store bookmark",
                    quote.id,
                    quote.bookmarkedBy,
                    loginUser.uid
                  );
                }
              } catch (e) {
                displayErrorToast(e);
              }
            }}
            className={`flex cursor-pointer items-center gap-1 duration-300 hover:opacity-70`}
          >
            {isBookmarked ? (
              <>
                <BsBookmarkFill size={12} className="text-green-500" />
                <span className={`text-green-500`}>
                  {quote.bookmarkedBy?.length || 0}
                </span>
              </>
            ) : (
              <>
                <BsBookmark size={12} />
                <span>{quote.bookmarkedBy?.length}</span>
              </>
            )}
          </span>
        </>
      ) : null} */}
    </div>
  );
};

export default Icons;
