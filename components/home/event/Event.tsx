"use client";
import { useEvent } from "@/context/EventContext";
import EventCard from "./EventCard";
import NoEventAvailable from "./NoEventAvailable";

const Event = () => {
  const { randomEvent, lockedEvent } = useEvent();

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
