"use client";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEvent } from "@/context/EventContext";
import { auth } from "@/config/Firebase";
import EventCard from "./EventCard";
import NoEventAvailable from "./NoEventAvailable";

const Event = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState<boolean>(true);

  const {
    randomEvent,
    getRandomEvent,
    lockedEvent,
    getLockedEvent,
    setRandomEvent,
    setLockedEvent,
  } = useEvent();

  useEffect(() => {
    setLoading(true);
    setRandomEvent(undefined);
    setLockedEvent(undefined);
    getLockedEvent();
    if (user) getRandomEvent();
    setLoading(false);
  }, [user]);

  if (loading) {
    return <Skeleton className="relative h-64 w-full rounded-lg p-12" />;
  }
  console.log("card render");


  if (!loading) {
    if (user) {
      if (!lockedEvent && !randomEvent) {
        return <NoEventAvailable />;
      } else if (lockedEvent) {
        return <EventCard event={lockedEvent} type="locked" />;
      } else if (randomEvent) {
        return <EventCard event={randomEvent} type="random" />;
      }
    } else {
      return (
        <div className="flex h-64 flex-col items-center justify-center bg-violet-50 p-12 text-center sm:rounded-lg">
          Login to set events
        </div>
      );
    }
  }
  return <div>Something wrong here</div>;
};

export default Event;
