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

import { IEvent } from "@/types/type";
import { MdPlace } from "react-icons/md";
import { BiInfoCircle, BiTime } from "react-icons/bi";

type Props = {
  event: IEvent;
  i: number;
};

const EventCard = ({ event, i }: Props) => {
  return (
    <Card className={`mb-3`}>
      <CardHeader>
        {/* <CardTitle>Card Title</CardTitle> */}
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
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

export default EventCard;
