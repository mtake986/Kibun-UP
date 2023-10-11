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
  BsHeartFill,
  BsHouseHeartFill,
  BsBookmarkFill,
  BsBookmarks,
  BsBookmark,
} from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkPlusIcon, Heart } from "lucide-react";

import { TypeQuote } from "@/types/type";
import { useQuote } from "@/context/QuoteContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/Firebase";
import Image from "next/image";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { changeTagColor } from "@/functions/functions";
import { BiDuplicate } from "react-icons/bi";

type Props = {
  q: TypeQuote;
  i: number;
};
const QuoteCard = ({ q, i }: Props) => {
  const {
    storeFav,
    removeFav,
    numOfFavs,
    storeQuoteInBookmarks,
    removeQuoteFromBookmarks,
    myBookmarks,
    numOfBookmarks,
  } = useQuote();
  const [user] = useAuthState(auth);

  return (
    <Card className={`mb-3`}>
      <CardHeader>
        {/* <CardTitle>Card Title</CardTitle> */}
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
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
          {q.tags && q.tags?.length >= 1 && (
            <div className="flex flex-wrap items-center gap-2">
              {q.tags.map((tag, i) => (
                <Badge
                  key={i}
                  className={`border-none font-light ${changeTagColor(
                    tag.tagColor
                  )}`}
                >
                  #{tag.tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-5">
        <div className="flex gap-1">
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
            numOfFavs?.some(
              (favQuote) =>
                // favQuote.qid === q.id && favQuote.uids.includes(user.uid)
                favQuote.qid === q.id
            ) ? (
              <>
                {user &&
                  (numOfFavs?.some(
                    (favQuote) =>
                      favQuote.qid === q.id && favQuote.uids.includes(user.uid)
                  ) ? (
                    <Heart size={14} fill="red" className="text-red-500" />
                  ) : (
                    <Heart size={14} className="text-red-500" />
                  ))}

                {numOfFavs?.map((favQuote, i) =>
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
                  if (myBookmarks && myBookmarks?.qids.includes(q.id)) {
                    removeQuoteFromBookmarks(user.uid, q);
                  } else {
                    storeQuoteInBookmarks(user.uid, q);
                  }
                }
              } catch (e) {
                console.log(e);
              }
            }}
            className={`flex items-center justify-between gap-1 bg-white duration-300 hover:bg-green-50`}
          >
            {myBookmarks && myBookmarks.qids.includes(q.id) ? (
              <BsBookmarkFill size={12} className="text-green-500" />
            ) : (
              <BsBookmark size={12} className="text-green-500" />
            )}
            <span className="ml-1 text-xs text-black">
              {numOfBookmarks?.map((bookmark, i) =>
                bookmark.qid === q.id ? bookmark.uids.length : null
              )}
            </span>
            {/* <span>Edit</span> */}
          </Button>
        </div>

        {q.userInfo.photoUrl && (
          <HoverCard>
            <HoverCardTrigger>
              <Image
                width={20}
                height={20}
                src={q.userInfo.photoUrl}
                alt="profile pic"
                className="rounded-full object-cover object-center duration-300"
              />
            </HoverCardTrigger>
            <HoverCardContent className="text-center text-xs">
              {q.userInfo.displayName}
            </HoverCardContent>
          </HoverCard>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuoteCard;

// 1: add a check if user is logged in
// 2: このQuoteがfavQuotesにあるかどうかを判断する
// 3: なかったら、storeFavを実行する
// 4: あったら、numOfFavs.uidsにuser.uidがあるかどうかを判断する
// 5: なかったら、storeFavを実行する
// 6: あったら、removeFavを実行する

{
  /* {user &&
          (numOfFavs.some(
            (favQuote) =>
              favQuote.qid === q.id && favQuote.uids.includes(user.uid)
          ) ? (
            <div>true</div>
          ) : (
            <div>false</div>
          ))} */
}
