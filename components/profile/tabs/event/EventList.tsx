"use client";
import React, { Suspense, useEffect, useState } from "react";
import { app, auth, db } from "@/app/config/Firebase";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  Timestamp,
  getFirestore,
  orderBy,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import EventCard from "./EventCard";
import { IEvent } from "@/types/type";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/app/context/AuthContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCollection } from "react-firebase-hooks/firestore";
import GoogleLoginBtn from "@/components/utils/GoogleLoginBtn";
import { useEvent } from "@/app/context/EventContext";

const EventList = () => {
  const [user] = useAuthState(auth);

  const params = useParams();

  const [value, loading, error] = useCollection(
    query(
      collection(getFirestore(app), "events"),
      where("uid", "==", params?.uid)
    ),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const { loginUserEvents, getLoginUserEvents } = useEvent();
  useEffect(() => {
    getLoginUserEvents();
  }, []);

  if (loading) {
    return <Skeleton className="relative mt-10 h-48 w-full rounded-lg p-12" />;
  } else {
    if (user) {
      if (loginUserEvents) {
        return (
          <div>
            <div>Collection:{loginUserEvents.length}</div>
            {loginUserEvents.map((doc) => (
              <EventCard key={doc.id} event={doc} />
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
  // return <div>Going wrong here</div>;
};

export default EventList;
