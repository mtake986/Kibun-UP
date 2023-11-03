"use client";
import { useEvent } from "@/context/EventContext";
import { auth } from "@/config/Firebase";
import EventCard from "./EventCard";
import NoEventAvailable from "./NoEventAvailable";
import { useAuthState } from "react-firebase-hooks/auth";

const Event = () => {
  const [user] = useAuthState(auth);
  const { randomEvent, lockedEvent } = useEvent();

  // todo: no need to refetch if exists

  if (!lockedEvent && !randomEvent) {
    return <NoEventAvailable />;
  } else if (lockedEvent) {
    return <EventCard event={lockedEvent} type="locked" />;
  } else if (randomEvent) {
    return <EventCard event={randomEvent} type="random" />;
  }

  return <div>Something wrong here</div>;
};

export default Event;
