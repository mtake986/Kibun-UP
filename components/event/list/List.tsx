"use client";
import React, { Suspense, useEffect, useState } from "react";
import { auth, db } from "@/app/config/Firebase";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import EventCard from "./EventCard";
import { IEvent } from "@/types/type";

const List = () => {
  const [user] = useAuthState(auth);

  const [events, setEvents] = useState<IEvent[] | any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    onSnapshot(collection(db, "events"), (snapshot) => {
      console.log('onsnapshot ===')
      setEvents(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  console.log("List.tsx: events -> ", events);
  return (
    <div>
      <h2 className="mb-2 mt-4 text-center text-3xl font-bold">
        Your {events.length} events
      </h2>
      {events.map((event, i) => (
        <EventCard key={i} event={event} i={i}  />
      ))}
    </div>
  );
};

export default List;
