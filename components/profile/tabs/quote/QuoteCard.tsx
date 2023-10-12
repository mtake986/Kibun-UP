import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BsFillPersonFill,
  BsChatLeftText,
  BsToggle2Off,
  BsToggle2On,
  BsBookmarkFill,
  BsBookmark,
} from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

import { auth } from "@/config/Firebase";
import { TypeQuote } from "@/types/type";
import EditModeOn from "./EditModeOn";
import { BiLock, BiLockOpen } from "react-icons/bi";
import { useQuote } from "@/context/QuoteContext";
import { Heart } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Badge } from "@/components/ui/badge";

type Props = {
  q: TypeQuote;
};

const QuoteCard = ({ q }: Props) => {
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const {
    lockThisQuote,
    lockedQuote,
    handleDelete,
    removeLockFromThisQuote,
    myFavs,
    numOfFavs,
    myBookmarks,
    numOfBookmarks,
    storeQuoteInBookmarks,
    removeQuoteFromBookmarks,

  } = useQuote();

  const [user] = useAuthState(auth);

  if (q.userInfo.uid !== user?.uid && q.isDraft) return null;

  return (
    <Card
      className={`mb-3 ${
        isUpdateMode ? "border border-violet-500 bg-violet-50/10" : null
      }`}
    >
      <CardHeader>
        {/* <CardTitle>Card Title</CardTitle> */}
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      {isUpdateMode ? (
        <CardContent>
          <EditModeOn q={q} setIsUpdateMode={setIsUpdateMode} />
        </CardContent>
      ) : (
        <>
          <CardContent>
            <div className="flex flex-col gap-3">
              <div className="flex items-center">
                <div className="flex w-10">
                  <BsChatLeftText size={20} className="mr-5" />
                </div>
                <p className="">{q.quote}</p>
              </div>
              <div className="flex items-center">
                <div className="flex w-10">
                  <BsFillPersonFill size={20} className="mr-5" />
                </div>
                <p className="">{q.person}</p>
              </div>
              <div className="flex items-center">
                {q.isDraft ? (
                  <>
                    <div className="flex w-10">
                      <BsToggle2Off size={20} className="mr-5" />
                    </div>
                    <p>Draft</p>
                  </>
                ) : (
                  <>
                    <div className="flex w-10">
                      <BsToggle2On size={20} className="mr-5" />
                    </div>
                    <p>Public</p>
                  </>
                )}
              </div>
              {q.tags && q.tags?.length >= 1 && (
                <div className="flex flex-wrap items-center gap-2">
                  {q.tags.map((tag, i) => (
                    <Badge
                      key={i}
                      variant={null}
                      className={`border-none font-light bg-${tag.tagColor}-50 text-${tag.tagColor}-500 hover:bg-${tag.tagColor}-50 hover:text-${tag.tagColor}-500`}
                    >
                      #{tag.tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex items-center justify-between gap-5">
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

              {user &&
              numOfFavs.some(
                (favQuote) =>
                  // favQuote.qid === q.id && favQuote.uids.includes(user.uid)
                  favQuote.qid === q.id
              ) ? (
                <Button className="flex cursor-default items-center gap-1.5 bg-white text-black hover:bg-white">
                  {user &&
                    (numOfFavs.some(
                      (favQuote) =>
                        favQuote.qid === q.id &&
                        favQuote.uids.includes(user.uid)
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
              )}
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
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default QuoteCard;
