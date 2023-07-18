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
import Link from "next/link";
import {
  Edit,
  InfoIcon,
  Plane,
  Timer,
  TimerIcon,
  ToggleLeft,
  ToggleRight,
  ToggleRightIcon,
  Trash,
} from "lucide-react";
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
// import EditModeOn from "./EditModeOn";
import { MdPlace } from "react-icons/md";
import { BiInfoCircle, BiTime } from "react-icons/bi";
import { IEvent, IEventInputValues } from "@/types/type";
import { BsToggle2Off, BsToggle2On } from "react-icons/bs";
import EditModeOn from "./EditModeOn";
import { useEvent } from "@/app/context/EventContext";

type Props = {
  event: DocumentData;
};
const QuoteCard = ({ event }: Props) => {

  const [detailsOpen, setDetailsOpen] = useState(false);
  const showDetails = () => {
    setDetailsOpen(!detailsOpen);
  };

    const handleEditMode = () => {
      setEditModeOn(true);
    };

    const [editModeOn, setEditModeOn] = useState<boolean>(false);
    const [eventInput, setEventInput] = useState<IEvent>();
    const [date, setDate] = useState<Date>();

    const handleSave = async (id: string, values: IEventInputValues) => {
      const docRef = doc(db, "events", id);
      await updateDoc(docRef, {
        ...values,
        updatedAt: serverTimestamp(),
      }).then(() => {
        toast({
          className: "border-none bg-green-500 text-white",
          title: "Successfully Updated",
          description: `
            Event Title: ${values.eventTitle}, 
            Place: ${values.place}, 
            Event Date: ${values.eventDate.toDateString()},
            Description: ${values.description},
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
    <Card
      className={`mb-3 ${
        editModeOn && "border border-violet-500 bg-violet-50/10"
      }`}
    >
      <CardHeader>
        {/* <CardTitle>Card Title</CardTitle> */}
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      {editModeOn ? (
        <CardContent>
          <EditModeOn
            event={event}
            handleSave={handleSave}
            handleCancelEdit={handleCancelEdit}
            handleDelete={handleDelete}
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
                  <div className="flex items-center gap-5">
                    {event.target ? (
                      <>
                        <BsToggle2Off size={24} />
                        <p>Target On</p>
                      </>
                    ) : (
                      <>
                        <BsToggle2On size={24} />
                        <p>Target Off</p>
                      </>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-end gap-5">
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

export default QuoteCard;
