import { Button } from "@/components/ui/button";
import { auth } from "@/config/Firebase";
import { useQuote } from "@/context/QuoteContext";
import { TypeQuote } from "@/types/type";
import { Edit, Heart, Trash } from "lucide-react";
import React, { useState } from "react";
import { BiLock, BiLockOpen } from "react-icons/bi";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

type Props = {
  q: TypeQuote;
  setIsUpdateMode: (boo: boolean) => void;
  isUpdateMode: boolean;
};

const Icons = ({ q, setIsUpdateMode, isUpdateMode }: Props) => {
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

  const [user, setUser] = useState(auth.currentUser);

  return (
    <>
      <div className="flex items-center justify-between gap-1">
        <Button
          onClick={() => setIsUpdateMode(true)}
          className={`duration-300  hover:bg-blue-50 hover:text-blue-500 sm:w-auto`}
          variant="ghost"
        >
          <Edit size={14} />
          {/* <span>Edit</span> */}
        </Button>
        {lockedQuote?.id === q.id ? (
          <Button
            onClick={() => {
              if (user) removeLockFromThisQuote(user?.uid);
            }}
            className={`text-red-500  duration-300 hover:bg-red-50 hover:text-red-500 sm:w-auto`}
            variant="ghost"
          >
            <BiLock size={14} />
          </Button>
        ) : (
          <Button
            onClick={() => {
              if (q.isDraft) alert("Needs to be Public.");
              else {
                if (user) lockThisQuote(user?.uid, q);
              }
            }}
            className={`duration-300 hover:bg-red-50 hover:text-red-500 sm:w-auto`}
            variant="ghost"
          >
            <BiLockOpen size={14} />
          </Button>
        )}

        {/* {user &&
        numOfFavs.some(
          (favQuote) =>
            // favQuote.qid === q.id && favQuote.uids.includes(user.uid)
            favQuote.qid === q.id
        ) ? (
          <Button className="flex cursor-default items-center gap-1.5 bg-white text-black hover:bg-white">
            {user &&
              (numOfFavs.some(
                (favQuote) =>
                  favQuote.qid === q.id && favQuote.uids.includes(user.uid)
              ) ? (
                <Heart size={14} fill="red" className="text-red-500" />
              ) : (
                <Heart size={14} />
              ))}

            {numOfFavs.map((favQuote, i) =>
              favQuote.qid === q.id ? (
                <span key={i} className="text-xs">
                  {favQuote.uids.length}
                </span>
              ) : null
            )}
          </Button>
        ) : (
          <Button className="flex cursor-default items-center gap-1.5 bg-white text-black hover:bg-white">
            <Heart size={14} />
            <span className="text-xs">0</span>
          </Button>
        )} */}
        <Button
          onClick={() => {
            if (user) {
              numOfFavs.some(
                (favQuote) =>
                  favQuote.qid === q.id && favQuote.uids.includes(user.uid)
              )
                ? removeFav(user.uid, q)
                : storeFav(user.uid, q);
            }
          }}
          className={`flex items-center justify-between gap-1 bg-white duration-300 hover:bg-red-50`}
        >
          {user &&
          numOfFavs.some(
            (favQuote) =>
              // favQuote.qid === q.id && favQuote.uids.includes(user.uid)
              favQuote.qid === q.id
          ) ? (
            <>
              {user &&
                (numOfFavs.some(
                  (favQuote) =>
                    favQuote.qid === q.id && favQuote.uids.includes(user.uid)
                ) ? (
                  <Heart size={14} fill="red" className="text-red-500" />
                ) : (
                  <Heart size={14} className="text-red-500" />
                ))}

              {numOfFavs.map((favQuote, i) =>
                favQuote.qid === q.id ? (
                  <span key={i} className="text-xs text-black">
                    {favQuote.uids.length}
                  </span>
                ) : null
              )}
            </>
          ) : (
            <div className="flex cursor-pointer items-center gap-1 duration-300 hover:opacity-50">
              <Heart size={14} className="text-red-500" />
              <span className="text-xs text-black">0</span>
            </div>
          )}
        </Button>
        <Button
          onClick={() => {
            try {
              if (user) {
                if (myBookmarks && myBookmarks.qids.includes(q.id)) {
                  removeQuoteFromBookmarks(user.uid, q);
                } else {
                  storeQuoteInBookmarks(user.uid, q);
                }
              }
            } catch (e) {
              console.error(e);
            }
          }}
          className={`flex items-center justify-between gap-1 bg-white duration-300 hover:bg-green-50`}
        >
          {user &&
          numOfBookmarks?.some(
            (b) =>
              // b.qid === q.id && b.uids.includes(user.uid)
              b.qid === q.id
          ) ? (
            <>
              {user &&
                (numOfBookmarks.some(
                  (b) => b.qid === q.id && b.uids.includes(user.uid)
                ) ? (
                  <BsBookmarkFill size={12} className="text-green-500" />
                ) : (
                  <BsBookmark size={12} className="text-green-500" />
                ))}

              {numOfBookmarks.map((b, i) =>
                b.qid === q.id ? (
                  <span key={i} className="text-xs text-black">
                    {b.uids.length}
                  </span>
                ) : null
              )}
            </>
          ) : (
            <div className="flex cursor-pointer items-center gap-1 duration-300 hover:opacity-50">
              <BsBookmark size={12} className="text-green-500" />
              <span className="text-xs text-black">0</span>
            </div>
          )}
        </Button>
      </div>

      <Button
        onClick={() => {
          handleDelete(q.id);
          if (user && lockedQuote?.id === q.id)
            removeLockFromThisQuote(user?.uid);
        }}
        className={`duration-300  hover:bg-red-50 hover:text-red-500 sm:w-auto`}
        variant="ghost"
      >
        <Trash size={14} />
        {/* <span>Delete</span> */}
      </Button>
    </>
  );
};

export default Icons;
