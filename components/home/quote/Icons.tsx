import useFetchQuoteFromQuotableAPI from "@/components/hooks/useFetchQuoteFromQuotableAPI";
import { useAuth } from "@/context/AuthContext";
import { useQuote } from "@/context/QuoteContext";
import { TypeQuote, TypeQuoteQuotetableAPI } from "@/types/type";
import React, { useEffect } from "react";
import { BiLockOpen, BiLock, BiRefresh } from "react-icons/bi";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

type Props = {
  quote: TypeQuoteQuotetableAPI | TypeQuote;
  type: "locked" | "appChoice" | "notAppChoice";
  refetch?: () => void;
};
const Icons = ({ quote, type, refetch }: Props) => {
  const {
    removeLockFromThisQuote,
    lockThisQuote,
    updateRandomQuote,
    myBookmarks,
    removeQuoteFromBookmarks,
    storeQuoteInBookmarks,
    numOfBookmarks,
    fetchMyBookmarks,
    fetchNumOfBookmarks,
  } = useQuote();
  const { loginUser } = useAuth();
  // const { refetch } = useFetchQuoteFromQuotableAPI();

  useEffect(() => {
    fetchMyBookmarks();
    fetchNumOfBookmarks();
  }, []);

  return (
    <div className="flex items-center gap-3 cursor-pointer">
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

      <div className="flex items-center gap-0.5">
        {myBookmarks && myBookmarks.qids.includes(quote.id) ? (
          <BsBookmarkFill
            size={14}
            className="text-green-500"
            onClick={() => {
              if (loginUser) removeQuoteFromBookmarks(loginUser.uid, quote);
            }}
          />
        ) : (
          <BsBookmark
            size={14}
            className="text-black"
            onClick={() => {
              if (loginUser) storeQuoteInBookmarks(loginUser.uid, quote);
            }}
          />
        )}
        <span className="ml-1 text-xs text-black">
          {numOfBookmarks?.map((bookmark, i) =>
            bookmark.qid === quote.id ? bookmark.uids.length : null
          )}
        </span>
        {/* <span>Edit</span> */}
      </div>
    </div>
  );
};

export default Icons;
