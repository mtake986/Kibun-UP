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
import EditModeOn from "./card/EditModeOn";
import Icons from "./card/Icons";
import Content from "./card/Content";

type Props = {
  q: TypeQuote;
  i: number;
};

const QuoteCard = ({ q, i }: Props) => {
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const [user, setUser] = useState(auth.currentUser);

  // if (q.userInfo.uid !== user?.uid && q.isDraft) return null;
  return (
    <div className="mb-3 rounded-sm border p-4 sm:p-6">
      {isUpdateMode ? (
        <EditModeOn q={q} setIsUpdateMode={setIsUpdateMode} />
      ) : (
        <Content q={q} />
      )}
      <Icons
        q={q}
        setIsUpdateMode={setIsUpdateMode}
        isUpdateMode={isUpdateMode}
      />
    </div>
  );
};

export default QuoteCard;
