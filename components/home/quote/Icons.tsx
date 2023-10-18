import { useAuth } from "@/context/AuthContext";
import { useQuote } from "@/context/QuoteContext";
import { TypeLoginUser, TypeQuote, TypeQuoteQuotetableAPI } from "@/types/type";
import { Heart } from "lucide-react";
import React, { useEffect } from "react";
import { BiLockOpen, BiLock, BiRefresh } from "react-icons/bi";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

type Props = {
  quote: TypeQuoteQuotetableAPI | TypeQuote;
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

  const notAPI = "likedBy" in quote;
  const isLiked = notAPI && quote.likedBy.some((id) => id === loginUser.uid);
  const isBookmarked = notAPI && quote.bookmarkedBy.some((id) => id === loginUser.uid);

  const heartFill = isLiked ? "red" : undefined;
  const bookmarkFill = isBookmarked ? "green" : undefined;

  return (
    <div className="flex cursor-pointer items-center gap-3">
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
          className={`text-red-500  duration-300 hover:bg-red-50 hover:text-red-500 sm:w-auto`}
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

      {notAPI ? (
        <span
          onClick={() => {
            isLiked
              ? removeFav(loginUser.uid, quote)
              : storeFav(loginUser.uid, quote);
          }}
          className={`flex cursor-pointer items-center gap-1 duration-300 hover:opacity-50`}
        >
          {isLiked ? (
            <Heart size={14} className="text-red-500" fill={heartFill} />
          ) : (
            <Heart size={14} className="text-red-500" />
          )}
          <span className={`text-red-500`}>{quote.likedBy.length}</span>
        </span>
      ) : null}

      {notAPI ? (
        <span
          onClick={() => {
            isLiked
              ? removeFav(loginUser.uid, quote)
              : storeFav(loginUser.uid, quote);
          }}
          className={`flex cursor-pointer items-center gap-1 duration-300 hover:opacity-50`}
        >
          {isLiked ? (
            <Heart size={14} className="text-red-500" fill={heartFill} />
          ) : (
            <Heart size={14} className="text-red-500" />
          )}
          <span className={`text-red-500`}>{quote.likedBy.length}</span>
        </span>
      ) : null}

      {notAPI ? (
        <span
          onClick={() => {
            isBookmarked
              ? removeBookmark(loginUser.uid, quote)
              : storeBookmark(loginUser.uid, quote);
          }}
          className={`flex cursor-pointer items-center gap-1 duration-300 hover:opacity-50`}
        >
          {isBookmarked ? (
            <BsBookmarkFill
              size={12}
              className="text-green-500"
              fill={bookmarkFill}
            />
          ) : (
            <BsBookmark size={12} className="text-green-500" />
          )}
          <span className={`text-green-500`}>{quote.bookmarkedBy.length}</span>
        </span>
      ) : null}
    </div>
  );
};

export default Icons;
