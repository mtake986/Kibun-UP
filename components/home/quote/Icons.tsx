
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
    myBookmarks,
    removeQuoteFromBookmarks,
    storeQuoteInBookmarks,
    fetchMyBookmarks,
    fetchNumOfBookmarks,
    removeFav,
    storeFav,
    numOfFavs,
    fetchMyFavs,
    fetchNumOfFavs,
  } = useQuote();

  useEffect(() => {
    fetchMyBookmarks();
    fetchNumOfBookmarks();

    fetchMyFavs();
    fetchNumOfFavs();
  }, []);

  const isFav = numOfFavs.some(
    (favQuote) =>
      favQuote.qid === quote.id && favQuote.uids.includes(loginUser.uid)
  );

  const heartFill = isFav ? "red" : undefined;

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

      {myBookmarks && myBookmarks.qids.includes(quote.id) ? (
        <BsBookmarkFill
          size={14}
          className="text-green-500 duration-300 hover:opacity-50"
          onClick={() => {
            if (loginUser) removeQuoteFromBookmarks(loginUser.uid, quote);
          }}
        />
      ) : (
        <BsBookmark
          size={14}
          className="text-black duration-300 hover:opacity-50"
          onClick={() => {
            if (loginUser) storeQuoteInBookmarks(loginUser.uid, quote);
          }}
        />
      )}
      <span
        onClick={() => {
          isFav ? removeFav(loginUser.uid, quote) : storeFav(loginUser.uid, quote);
        }}
        className={`duration-300 hover:opacity-50`}
      >
        {numOfFavs.some(
          (favQuote) =>
            // favQuote.qid === quote.id && favQuote.uids.includes(loginUser.uid)
            favQuote.qid === quote.id
        ) ? (
          <>
            <Heart size={14} fill={heartFill} className="text-red-500" />
          </>
        ) : (
          <>
            <Heart size={14} className="text-black" />
          </>
        )}
      </span>
    </div>
  );
};

export default Icons;
