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
} from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

import { IQuote } from "@/types/type";

type Props = {
  q: IQuote;
  i: number;
};
const CardNotMine = ({ q, i }: Props) => {
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
          onClick={() => {
            alert("Liked");
          }}
          className={`duration-300  hover:bg-red-50 hover:text-red-500 sm:w-auto`}
          variant="ghost"
        >
          <Heart size={14} />
          {/* <span>Delete</span> */}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardNotMine;
