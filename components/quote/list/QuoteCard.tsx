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
import { auth, db } from "@/app/config/Firebase";
import { toast } from "@/components/ui/use-toast";
import { IQuote, IQuoteInputValues } from "@/types/type";
import EditModeOn from "./EditModeOn";
import { BiLock, BiLockOpen } from "react-icons/bi";
import { useQuote } from "@/app/context/QuoteContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { User, UserProfile } from "firebase/auth";
type Props = {
  q: IQuote;
  i: number;
};

const QuoteCard = ({ q, i }: Props) => {
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [person, setPerson] = useState<string>(q.person);
  const [quote, setQuote] = useState<string>(q.quote);

  const {
    lockThisQuote,
    lockedQuote,
    handleDelete,
    removeLockThisQuote,
    getLockedQuote,
  } = useQuote();

  // const [user] = useAuthState(auth);

  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    // setLoading(true);
    // getPrimaryQuote();
    getLockedQuote(user?.uid);
    // setLoading(false);
  }, [user]);

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
              <div className="flex items-center gap-5">
                <BsFillPersonFill size={24} />
                <p>{q.person}</p>
              </div>
              <div className="flex items-center gap-5">
                <BsChatLeftText size={24} />
                <p>{q.quote}</p>
              </div>
              <div className="flex items-center gap-5">
                {q.isDraft ? (
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
                    if (user) removeLockThisQuote(user?.uid);
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
            </div>

            <Button
              onClick={() => {
                handleDelete(q.id);
                if (user && lockedQuote?.id === q.id)
                  removeLockThisQuote(user?.uid);
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
