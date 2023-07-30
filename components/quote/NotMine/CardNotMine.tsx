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
import { useQuote } from "@/app/context/QuoteContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/config/Firebase";

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
            <BsFillPersonFill size={24} />
            <p>{q.person}</p>
          </div>
          <div className="flex items-center gap-5">
            <BsChatLeftText size={24} />
            <p>{q.quote}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-5">
        <Button
          onClick={
            // TODO1: add a check if user is logged in
            // todo2: このQuoteがfavQuotesにあるかどうかを判断する
            // todo3: なかったら、storeFavQuoteを実行する
            // todo4: あったら、favQuotes.uidsにuser.uidがあるかどうかを判断する
            // todo5: なかったら、storeFavQuoteを実行する
            // todo6: あったら、removeFavQuoteを実行する

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
          className={`duration-300  hover:bg-red-50 hover:text-red-500 sm:w-auto`}
          variant="ghost"
        >
          {user &&
          favQuotes.some(
            (favQuote) =>
              favQuote.qid === q.id && favQuote.uids.includes(user.uid)
          ) ? (
            <Heart size={14} fill="red" className="text-red-500" />
          ) : (
            <Heart size={14} />
          )}
        </Button>
        <span>{q.displayName}</span>
      </CardFooter>
    </Card>
  );
};

export default CardNotMine;

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
