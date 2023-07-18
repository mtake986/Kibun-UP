"use client";
import React, { Suspense, useEffect, useState } from "react";
import { auth, db } from "@/app/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import EventCard from "./EventCard";
import { IEvent } from "@/types/type";
import { Skeleton } from "@/components/ui/skeleton";
import { useEvent } from "@/app/context/EventContext";
import EventListTitle from "./EventListTitle";
import GoogleLoginBtn from "@/components/utils/GoogleLoginBtn";

type Props = {
  events: IEvent[];
};

const List = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState<boolean>(false);
  const { loginUserEvents, getLoginUserEvents } = useEvent();
  useEffect(() => {
    setLoading(true);
    getLoginUserEvents();
    setLoading(false);
  }, []);


  if (loading) {
    return <Skeleton className="relative mt-10 h-48 w-full rounded-lg p-12" />;
  } else {
    if (user) {
      if (loginUserEvents) {
        return (
          <div>
            <EventListTitle />
            {loginUserEvents.map((doc, i) => (
              <EventCard key={doc.id} event={doc} i={i} />
            ))}
          </div>
        );
      } else {
        return (
          <div className="mt-10">
            <h2 className="mb-2 mt-4 text-center text-3xl font-bold">
              You have no events
            </h2>
          </div>
        );
      }
    } else {
      return <GoogleLoginBtn />;
    }
  }
};

export default List;
