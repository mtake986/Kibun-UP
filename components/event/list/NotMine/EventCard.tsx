
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

import { IEvent } from "@/types/type";
import { MdPlace } from "react-icons/md";
import { BiInfoCircle, BiTime } from "react-icons/bi";
import HeadingThree from "@/components/utils/HeadingThree";

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
          {/* <BsCalendarEvent size={24} /> */}
          <HeadingThree
            text={event.eventTitle}
            className="truncate text-center text-2xl font-semibold"
          />
          {event.place && (
            <div className="flex items-center">
              <div className="flex w-10">
                <MdPlace size={20} className="mr-5" />
              </div>
              <p className="">{event.place}</p>
            </div>
          )}
          {event.eventDate && (
            <div className="flex items-center">
              <div className="flex w-10">
                <BiTime size={24} className="mr-5" />
              </div>
              <p>{event.eventDate.toDate().toDateString()}</p>
            </div>
          )}
          {event.description && (
            <div className="flex items-center">
              <div className="flex w-10">
                <BiInfoCircle size={24} className="mr-5" />
              </div>
              <p className="">{event.description}</p>
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
