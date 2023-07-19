"use client";

import { auth, db } from "@/app/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import EventCard from "./EventCard";
import { IEvent } from "@/types/type";

type Props = {
  events: IEvent[];
};

const UserEventList = ({ events }: Props) => {
  const [user] = useAuthState(auth);

  return (
    <div>
      {events && events.length >= 1 ? (
        events.map((doc, i) => <EventCard key={doc.id} event={doc} i={i} />)
      ) : (
        <div className="mt-10">
          <h2 className="mb-2 mt-4 text-center text-3xl font-bold">
            You have no events
          </h2>
        </div>
      )}
    </div>
  );
};

export default UserEventList;
