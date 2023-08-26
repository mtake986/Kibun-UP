import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Edit, Target, Trash } from "lucide-react";
import { auth } from "@/config/Firebase";
import { Button } from "@/components/ui/button";
import { MdPlace } from "react-icons/md";
import { BiInfoCircle, BiTime } from "react-icons/bi";

type Props = {
  event: IEvent;
  i: number;
};

import { IEventInputValues, IEvent } from "@/types/type";
import { useEvent } from "@/context/EventContext";
import EditModeOn from "./EditModeOn";
import Loading from "@/components/utils/Loading";

const EventCard = ({ event, i }: Props) => {
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleDelete,
    lockThisEvent,
    lockedEvent,
    unlockThisEvent,
    getLockedEvent,
  } = useEvent();

  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    // setLoading(true);
    // getPrimaryQuote();
    getLockedEvent();
    // setLoading(false);
  }, [user]);

  if (isLoading) {
    return (
      <Card className="mb-3">
        <CardHeader></CardHeader>
        <CardContent>
          <Loading />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    );
  }

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
              <div className="">
                {/* <BsCalendarEvent size={24} /> */}
                <h3 className="text-center text-2xl font-semibold">
                  {event.eventTitle}
                </h3>
              </div>
              {event.place && (
                <div className="flex items-center gap-5">
                  <MdPlace size={24} />
                  <p>{event.place}</p>
                </div>
              )}
              <div className="flex items-center gap-5">
                <BiTime size={24} />
                <p>{event.eventDate.toDate().toDateString()}</p>
              </div>
              {event.description && (
                <div className="flex items-center gap-5">
                  <BiInfoCircle size={24} />
                  <p>{event.description}</p>
                </div>
              )}
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
                    // alert("Set as a target");
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
                handleDelete(event.id);
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

export default EventCard;
