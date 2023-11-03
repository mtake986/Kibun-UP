"use client";
import { useEvent } from "@/context/EventContext";
import { auth } from "@/config/Firebase";
import EventCard from "./EventCard";
import NoEventAvailable from "./NoEventAvailable";
import { useEffect, useState } from "react";
import { displayErrorToast } from "@/functions/displayToast";
import { useAuth } from "@/context/AuthContext";
import LoadingSpinnerL from "@/components/utils/LoadingSpinnerL";
import LoadingIndicator from "../LoadingIndicator";

const Event = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { randomEvent, lockedEvent } = useEvent();

  const { getRandomEvent, getLockedEvent } = useEvent();

  const { loginUser, fetchLoginUser } = useAuth();
// todo: no need to refetch if exists
  useEffect(() => {
    const fetchEvents = () => {
      getLockedEvent();
      if (auth.currentUser) getRandomEvent();
    };

    setIsLoading(true);
    try {
      if (loginUser) fetchLoginUser(auth.currentUser);
      fetchEvents();
    } catch (error) {
      displayErrorToast(error);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  }, []);

  if (isLoading) {
    return <LoadingIndicator text={"Loading an Event..."} />;
  }

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
