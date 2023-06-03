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
} from "react-icons/bs";
import Link from "next/link";
import { Edit, Plane, Trash } from "lucide-react";
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
import { string } from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import EditModeOn from "./EditModeOn";

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
    <Card className="mb-3">
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
              <div className="flex items-center gap-5">
                <BsFillPersonFill size={24} />
                <p>{event.description}</p>
              </div>
              <div className="flex items-center gap-5">
                <BsChatLeftText size={24} />
                <p>{event.eventTitle}</p>
              </div>
              <div className="flex items-center gap-5">
                <BsCalendar size={24} />
                <p>{event.eventDate.toDate().toDateString()}</p>
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
