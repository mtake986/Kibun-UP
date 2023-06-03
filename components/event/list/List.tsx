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

const List = () => {
  const [user] = useAuthState(auth);
  type EventType = {
      createdAt: Timestamp;
      id: string;
      description: string;
      eventDate: Timestamp;
      eventTitle: string;
      uid: string;
  };
  const [events, setEvents] = useState<EventType[] | any[]>([]);
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
