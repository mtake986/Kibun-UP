import { DocumentData } from "firebase/firestore";
import React, { useState } from "react";
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
} from "react-icons/bs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Edit, Plane, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  doc,
  serverTimestamp,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/app/config/Firebase";
import { toast } from "@/components/ui/use-toast";
import { IQuote, IQuoteInputValues } from "@/types/type";
import EditModeOn from "./EditModeOn";
import { useQuote } from "@/app/context/QuoteContext";

type Props = {
  quote: DocumentData;
};
const QuoteCard = ({ quote }: Props) => {
  const { handleEditMode, editModeOn, handleDelete } = useQuote();

  return (
    <Card
      className={`mb-3 ${
        editModeOn ? "border border-violet-500 bg-violet-50/10" : null
      }`}
    >
      <CardHeader>
        {/* <CardTitle>Card Title</CardTitle> */}
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      {editModeOn ? (
        <CardContent>
          <EditModeOn q={quote} />
        </CardContent>
      ) : (
        <>
          <CardContent>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-5">
                <BsFillPersonFill size={24} />
                <p>{quote.person}</p>
              </div>
              <div className="flex items-center gap-5">
                <BsChatLeftText size={24} />
                <p>{quote.quote}</p>
              </div>
              <div className="flex items-center gap-5">
                {quote.isDraft ? (
                  <>
                    <BsToggle2Off size={24} />
                    <p>Draft</p>
                  </>
                ) : (
                  <>
                    <BsToggle2On size={24} />
                    <p>Public</p>
                  </>
                )}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex items-center justify-between gap-5">
            <Button
              onClick={() => handleEditMode()}
              className={`duration-300  hover:bg-blue-50 hover:text-blue-500 sm:w-auto`}
              variant="ghost"
            >
              <Edit size={14} />
              {/* <span>Edit</span> */}
            </Button>
            <Button
              onClick={() => handleDelete(quote.id)}
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
