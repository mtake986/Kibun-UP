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
  Edit,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
// import EditModeOn from "./EditModeOn";
import { MdPlace } from "react-icons/md";
import { BiInfoCircle, BiTime } from "react-icons/bi";
import { IEvent, IEventInputValues } from "@/types/type";
import { BsToggle2Off, BsToggle2On } from "react-icons/bs";
import EditModeOn from "./EditModeOn";
import { useEvent } from "@/app/context/EventContext";
import { Target } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/config/Firebase";

type Props = {
  event: IEvent;
};
const QuoteCard = ({ event }: Props) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const showDetails = () => {
    setDetailsOpen(!detailsOpen);
  };

  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleDelete,
    lockThisEvent,
    lockedEvent,
    unlockThisEvent,
  } = useEvent();

  const [user] = useAuthState(auth);
  return (
    <Card
      className={`mb-3 ${
        isUpdateMode && "border border-violet-500 bg-violet-50/10"
      }`}
    >
      <CardHeader>
        {/* <CardTitle>Card Title</CardTitle> */}
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      {isUpdateMode ? (
        <CardContent>
          <EditModeOn
            event={event}
            setIsUpdateMode={setIsUpdateMode}
            setIsLoading={setIsLoading}
          />
        </CardContent>
      ) : (
        <>
          <CardContent>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                {/* <BsCalendarEvent size={24} /> */}
                <h3 className="text-center text-2xl font-semibold">
                  {event.eventTitle}
                </h3>
                <Button
                  className="w-auto bg-slate-50 text-black hover:bg-slate-100"
                  onClick={() => showDetails()}
                >
                  {detailsOpen ? "Close" : "Show Details"}
                </Button>
              </div>
              {detailsOpen ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-5">
                    <MdPlace size={24} />
                    <p>{event.place}</p>
                  </div>
                  <div className="flex items-center gap-5">
                    <BiTime size={24} />
                    <p>{event.eventDate.toDate().toDateString()}</p>
                  </div>
                  <div className="flex items-center gap-5">
                    <BiInfoCircle size={24} />
                    <p>{event.description}</p>
                  </div>
                </div>
              ) : null}
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between gap-5">
            <div className="flex items-center justify-between gap-2">
              <Button
                onClick={() => setIsUpdateMode(true)}
                className={`duration-300  hover:bg-blue-50 hover:text-blue-500 sm:w-auto`}
                variant="ghost"
              >
                <Edit size={14} />
              </Button>
              {lockedEvent?.id === event.id ? (
                <Button
                  onClick={() => {
                    unlockThisEvent();
                  }}
                  className={`text-red-500  duration-300 hover:bg-red-50 hover:text-red-500 sm:w-auto`}
                  variant="ghost"
                >
                  <Target size={14} />
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    lockThisEvent(event);
                    alert("Set as a target");
                  }}
                  className={`duration-300 hover:bg-red-50 hover:text-red-500 sm:w-auto`}
                  variant="ghost"
                >
                  <Target size={14} />
                </Button>
              )}
            </div>
            <Button
              onClick={() => {
                handleDelete(event.id)
                if (user && lockedEvent?.id === event.id) unlockThisEvent();
              }}
              className={`duration-300  hover:bg-red-50 hover:text-red-500 sm:w-auto`}
              variant="ghost"
            >
              <Trash size={14} />
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default QuoteCard;
