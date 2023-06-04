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
  BsCalendar2,
  BsCalendar,
  BsCalendarEventFill,
  BsCalendarEvent,
  BsCalendarDate,
} from "react-icons/bs";
import Link from "next/link";
import { Edit, InfoIcon, Plane, Timer, TimerIcon, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  doc,
  serverTimestamp,
  setDoc,
  deleteDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/app/config/Firebase";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import EditModeOn from "./EditModeOn";
import { MdPlace } from "react-icons/md";
import { BiInfoCircle, BiTime } from "react-icons/bi";
type Props = {
  event: IEvent;
  i: number;
};

import { IEventInputValues, IEvent } from "@/types/type";

const EventCard = ({ event, i }: Props) => {
  const handleEditMode = () => {
    setEditModeOn(true);
  };

  const [editModeOn, setEditModeOn] = useState<boolean>(false);
  const [eventInput, setEventInput] = useState<IEvent>(event);
  const [date, setDate] = React.useState<Date>();

  const handleSave = async (values: IEventInputValues) => {
    const docRef = doc(db, "events", event.id);
    await updateDoc(docRef, {
      ...values,
      updatedAt: serverTimestamp(),
    }).then(() => {
      toast({
        className: "border-none bg-green-500 text-white",
        title: "Successfully Updated",
        description: `
            Event Title: ${values.eventTitle}, 
            Description: ${values.description},
            Event Date: ${values.eventDate.toDateString()},
          `,
      });
      setEditModeOn(false);
    });
  };

  const handleCancelEdit = () => {
    setEditModeOn(false);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "events", id));
  };

  return (
    <Card className={`mb-3 ${editModeOn && 'border border-violet-500 bg-violet-50/10'}`}>
      <CardHeader>
        {/* <CardTitle>Card Title</CardTitle> */}
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      {editModeOn ? (
        <CardContent>
          <EditModeOn
            event={event}
            handleCancelEdit={handleCancelEdit}
            handleDelete={handleDelete}
            handleSave={handleSave}
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
              <div className="flex items-center gap-5">
                <BiTime size={24} />
                <p>{event.eventDate.toDate().toDateString()}</p>
              </div>
              <div className="flex items-center gap-5">
                <MdPlace size={24} />
                <p>Bunkhouse</p>
              </div>
              <div className="flex items-center gap-5">
                <BiInfoCircle size={24} />
                <p>{event.description}</p>
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
            </Button>
            <Button
              onClick={() => handleDelete(event.id)}
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
