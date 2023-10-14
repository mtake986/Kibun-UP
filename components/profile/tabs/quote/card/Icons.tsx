import { useQuote } from "@/context/QuoteContext";
import { TypeQuote } from "@/types/type";
import { Edit, Heart, Trash } from "lucide-react";
import { BiLock, BiLockOpen } from "react-icons/bi";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useAuth } from "@/context/AuthContext";
import { displayToast, tryCatchError } from "@/functions/functions";

type Props = {
  q: TypeQuote;
  setIsUpdateMode: (boo: boolean) => void;
};

const Icons = ({ q, setIsUpdateMode }: Props) => {
  const {
    lockThisQuote,
    lockedQuote,
    handleDelete,
    removeLockFromThisQuote,
    numOfFavs,
    myBookmarks,
    numOfBookmarks,
    storeQuoteInBookmarks,
    removeQuoteFromBookmarks,
    storeFav,
    removeFav,
  } = useQuote();

  const { loginUser } = useAuth();

  return (
    <div className="mt-5 flex items-center justify-between gap-2">
      <div className="flex items-center gap-5">
        <Edit
          size={14}
          onClick={() => setIsUpdateMode(true)}
          className="cursor-pointer duration-300 hover:opacity-50"
        />

        {lockedQuote?.id === q.id ? (
          <BiLock
            size={16}
            onClick={() => {
              if (loginUser) removeLockFromThisQuote(loginUser?.uid);
            }}
            className="cursor-pointer text-red-500 duration-300 hover:opacity-50"
          />
        ) : (
          <BiLockOpen
            size={16}
            onClick={() => {
              try {
                if (q.isDraft) {
                  displayToast("Needs to be Public", "red");
                } else {
                  if (loginUser) lockThisQuote(loginUser.uid, q);
                }
              } catch (e) {
                tryCatchError(e);
              }
            }}
            className="cursor-pointer hover:opacity-50"
          />
        )}

        <span
          onClick={() => {
            try {
              if (loginUser) {
                numOfFavs.some(
                  (favQuote) =>
                    favQuote.qid === q.id &&
                    favQuote.uids.includes(loginUser.uid)
                )
                  ? removeFav(loginUser.uid, q)
                  : storeFav(loginUser.uid, q);
              }
            } catch (e) {
              tryCatchError(e);
            }
          }}
          className={`flex cursor-pointer items-center gap-1 duration-300 hover:opacity-50`}
        >
          {loginUser &&
          numOfFavs.some(
            (favQuote) =>
              // favQuote.qid === q.id && favQuote.uids.includes(loginUser.uid)
              favQuote.qid === q.id
          ) ? (
            <>
              {loginUser &&
                (numOfFavs.some(
                  (favQuote) =>
                    favQuote.qid === q.id &&
                    favQuote.uids.includes(loginUser.uid)
                ) ? (
                  <Heart size={14} fill="red" className="text-red-500" />
                ) : (
                  <Heart size={14} className="text-red-500" />
                ))}

              {numOfFavs.map((favQuote, i) =>
                favQuote.qid === q.id ? (
                  <span key={i} className="text-sm text-red-500">
                    {favQuote.uids.length}
                  </span>
                ) : null
              )}
            </>
          ) : (
            <>
              <Heart size={14} className="text-red-500" />
              <span className="text-sm text-red-500">0</span>
            </>
          )}
        </span>

        <span
          onClick={() => {
            try {
              if (loginUser) {
                if (myBookmarks && myBookmarks.qids.includes(q.id)) {
                  removeQuoteFromBookmarks(loginUser.uid, q);
                } else {
                  storeQuoteInBookmarks(loginUser.uid, q);
                }
              }
            } catch (e) {
              tryCatchError(e);
            }
          }}
          className={`flex cursor-pointer items-center gap-1 duration-300 hover:opacity-50`}
        >
          {loginUser &&
          numOfBookmarks?.some(
            (b) =>
              // b.qid === q.id && b.uids.includes(loginUser.uid)
              b.qid === q.id
          ) ? (
            <>
              {loginUser &&
                (numOfBookmarks.some(
                  (b) => b.qid === q.id && b.uids.includes(loginUser.uid)
                ) ? (
                  <BsBookmarkFill size={12} className="text-green-500" />
                ) : (
                  <BsBookmark size={12} className="text-green-500" />
                ))}

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
      </div>

      <Trash
        size={14}
        onClick={() => {
          try {
            handleDelete(q.id);
            if (loginUser && lockedQuote?.id === q.id)
              removeLockFromThisQuote(loginUser.uid);
          } catch (e) {
            tryCatchError(e);
          }
        }}
        className="cursor-pointer duration-300 hover:opacity-50"
      />
    </div>
  );
};

export default Icons;
