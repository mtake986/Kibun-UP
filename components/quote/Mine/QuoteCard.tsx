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
import { Edit, Heart, Trash } from "lucide-react";

import { auth } from "@/app/config/Firebase";
import { IQuote } from "@/types/type";
import EditModeOn from "./EditModeOn";
import { BiLock, BiLockOpen } from "react-icons/bi";
import { useQuote } from "@/app/context/QuoteContext";
import { Badge } from "@/components/ui/badge";

type Props = {
  q: IQuote;
  i: number;
};

const QuoteCard = ({ q, i }: Props) => {
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const {
    lockThisQuote,
    lockedQuote,
    handleDelete,
    removeLockThisQuote,
    getLockedQuote,
    favQuotes,
  } = useQuote();

  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    // setLoading(true);
    // getPrimaryQuote();
    getLockedQuote(user?.uid);
    // setLoading(false);
  }, [user]);

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
              <div className="flex items-center gap-5">
                <BsChatLeftText size={24} />
                <p>{q.quote}</p>
              </div>
              <div className="flex items-center gap-5">
                <BsFillPersonFill size={24} />
                <p>{q.person}</p>
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
              {q.tags && (
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {q.tags.map((tag, i) => (
                    <Badge
                      key={i}
                      className={`font-light border-none bg-${tag.tagColor}-50 text-${tag.tagColor}-500`}
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

              {user &&
              favQuotes.some(
                (favQuote) =>
                  // favQuote.qid === q.id && favQuote.uids.includes(user.uid)
                  favQuote.qid === q.id
              ) ? (
                <Button className="flex cursor-default items-center gap-1.5 bg-white text-black hover:bg-white">
                  {user &&
                    (favQuotes.some(
                      (favQuote) =>
                        favQuote.qid === q.id &&
                        favQuote.uids.includes(user.uid)
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
                </Button>
              ) : (
                <Button className="flex cursor-default items-center gap-1.5 bg-white text-black hover:bg-white">
                  <Heart size={14} />
                  <span className="text-xs">0</span>
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
