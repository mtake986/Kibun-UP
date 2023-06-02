import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BsFillPersonFill, BsChatLeftText } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Edit,
  Plane,
  Trash,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { doc, serverTimestamp, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/config/Firebase";
import { toast } from "@/components/ui/use-toast";

type Props = {
  q: {
    [id: string]: {
      createdAt: any;
      id: string;
      person: string;
      quote: string;
      uid: string;
    };
  };
};

interface Quote {
  [id: string]: {
    createdAt: any;
    id: string;
    person: string;
    quote: string;
    uid: string;
  };
}

const QuoteCard = ({ q }: Quote) => {
  console.log(q);

  const handleEditMode = () => {
    setEditModeOn(true);
  };

  const [editModeOn, setEditModeOn] = useState(false);
  const [person, setPerson] = useState<string>(q.person);
  const [quote, setQuote] = useState<string>(q.quote);

  const handleSave = async ({
    quote,
    person,
    id,
  }: {
    quote: string;
    person: string;
    id: string;
  }) => {
    await setDoc(doc(db, "quotes", id), {
      quote,
      person,
      updatedAt: serverTimestamp(),
    }).then((res) => {
      toast({
        className: "border-none bg-green-500 text-white",
        title: "Successfully Updated",
        description: `
            Quote: ${quote}, 
            Person: ${person}
          `,
      });
      setPerson(person);
      setQuote(quote);
      setEditModeOn(false);
    });
  };

  const handleCancelEdit = () => {
    setEditModeOn(false);
    setPerson(q.person);
    setQuote(q.quote);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "quotes", id));
  };

  return (
    <Card>
      <CardHeader>
        {/* <CardTitle>Card Title</CardTitle> */}
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent>
        {editModeOn ? (
          <>
            <div className="mb-2 flex items-center gap-5">
              <BsFillPersonFill size={24} />
              <Input
                onChange={(e) => {
                  setPerson(e.target.value);
                }}
                value={person}
                id="person"
                placeholder="NIKE"
              />
            </div>
            <div className="mb-2 flex items-center gap-5">
              <BsChatLeftText size={24} />
              <Input
                onChange={(e) => {
                  setQuote(e.target.value);
                }}
                value={quote}
                // defaultValue={q.quote}
                id="quote"
                placeholder="just do it"
              />
            </div>
          </>
        ) : (
          <>
            <div className="mb-2 flex items-center gap-5">
              <BsFillPersonFill size={24} />
              <p>{q?.person}</p>
            </div>
            <div className="flex items-center gap-5">
              <BsChatLeftText size={24} />
              <p>{q?.quote}</p>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-5">
        {editModeOn ? (
          <div className="gap-3 flex items-center">
            <Button
              onClick={() => handleCancelEdit()}
              className={` flex items-center gap-2 duration-300  hover:bg-slate-50 hover:text-slate-500 sm:w-auto`}
              variant="ghost"
            >
              <Plane size={14} />
              <span>Cancel</span>
            </Button>
            <Button
              onClick={() => handleSave({ quote, person, id: q.id })}
              className={`flex items-center gap-2 duration-300  hover:bg-emerald-50 hover:text-emerald-500 sm:w-auto`}
              variant="ghost"
            >
              <Plane size={14} />
              <span>Save</span>
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => handleEditMode()}
            className={`duration-300  hover:bg-blue-50 hover:text-blue-500 sm:w-auto`}
            variant="ghost"
          >
            <Edit size={14} />
            {/* <span>Edit</span> */}
          </Button>
        )}
        <Button
          onClick={() => handleDelete(q.id)}
          className={`duration-300  hover:bg-red-50 hover:text-red-500 sm:w-auto`}
          variant="ghost"
        >
          <Trash size={14} />
          {/* <span>Delete</span> */}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuoteCard;
