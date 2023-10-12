"use client";
import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  BsFillPersonFill,
  BsChatLeftText,
  BsToggle2Off,
  BsToggle2On,
} from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Edit, Heart, Trash } from "lucide-react";

import { auth } from "@/config/Firebase";
import { TypeQuote } from "@/types/type";
import EditModeOn from "./EditModeOn";
import { BiLock, BiLockOpen } from "react-icons/bi";
import { useQuote } from "@/context/QuoteContext";
import { Badge } from "@/components/ui/badge";
import { changeTagColor } from "@/functions/functions";
import Icons from "./Icons";

type Props = {
  q: TypeQuote;
  i: number;
};

const QuoteCard = ({ q, i }: Props) => {
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const {
    lockThisQuote,
    lockedQuote,
    handleDelete,
    removeLockFromThisQuote,
    numOfFavs,
  } = useQuote();

  const [user, setUser] = useState(auth.currentUser);

  // if (q.userInfo.uid !== user?.uid && q.isDraft) return null;
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
            <Icons q={q} setIsUpdateMode={setIsUpdateMode} isUpdateMode = {isUpdateMode} />
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default QuoteCard;
