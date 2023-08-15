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
} from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

import { IQuote } from "@/types/type";
import { useQuote } from "@/context/QuoteContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/config/Firebase";
import Image from "next/image";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { changeTagColor } from "@/utils/functions";

type Props = {
  q: IQuote;
  i: number;
};
const CardNotMine = ({ q, i }: Props) => {
  const { storeFavQuote, removeFavQuote, favQuotes, isFav } = useQuote();
  const [user] = useAuthState(auth);

  return (
    <Card className={`mb-3`}>
      <CardHeader>
        {/* <CardTitle>Card Title</CardTitle> */}
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-5">
            <BsChatLeftText size={24} />
            <p>{q.quote}</p>
          </div>
          <div className="flex items-center gap-5">
            <BsFillPersonFill size={24} />
            <p>{q.person}</p>
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
        <div
          onClick={
            () => {
              if (user) {
                favQuotes.some(
                  (favQuote) =>
                    favQuote.qid === q.id && favQuote.uids.includes(user.uid)
                )
                  ? removeFavQuote(user.uid, q.id)
                  : storeFavQuote(user.uid, q.id);
              }
            }
            // ? removeFavQuote(user.uid, q.id)
            // : storeFavQuote(user.uid, q.id);
          }
          className={`flex cursor-pointer items-center gap-1.5 duration-300 hover:opacity-50 sm:w-auto`}
        >
          {user &&
          favQuotes.some(
            (favQuote) =>
              // favQuote.qid === q.id && favQuote.uids.includes(user.uid)
              favQuote.qid === q.id
          ) ? (
            <>
              {user &&
                (favQuotes.some(
                  (favQuote) =>
                    favQuote.qid === q.id && favQuote.uids.includes(user.uid)
                ) ? (
                  <Heart size={14} fill="red" className="text-red-500" />
                ) : (
                  <Heart size={14} />
                ))}

              {favQuotes.map((favQuote, i) =>
                favQuote.qid === q.id ? (
                  <span key={i} className="text-xs">
                    {favQuote.uids.length}
                  </span>
                ) : null
              )}
            </>
          ) : (
            <div className="flex cursor-pointer items-center gap-1.5 duration-300 hover:opacity-50 sm:w-auto">
              <Heart size={14} />
              <span className="text-xs">0</span>
            </div>
          )}
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

export default CardNotMine;

// 1: add a check if user is logged in
// 2: このQuoteがfavQuotesにあるかどうかを判断する
// 3: なかったら、storeFavQuoteを実行する
// 4: あったら、favQuotes.uidsにuser.uidがあるかどうかを判断する
// 5: なかったら、storeFavQuoteを実行する
// 6: あったら、removeFavQuoteを実行する

{
  /* {user &&
          (favQuotes.some(
            (favQuote) =>
              favQuote.qid === q.id && favQuote.uids.includes(user.uid)
          ) ? (
            <div>true</div>
          ) : (
            <div>false</div>
          ))} */
}
