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
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/app/context/AuthContext";
import { Button } from "@/components/ui/button";

const List = () => {
  const [user] = useAuthState(auth);
  const { signInWithGoogle } = useAuth();

  const [myEvents, setMyEvents] = useState<IEvent[] | any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const getEvents = async () => {
      console.log("user:", user, "id:", user?.uid);
      // auth.onAuthStateChanged((user) => {
      if (user) {
        const collectionRef = collection(db, "events");
        const q = query(collectionRef, where("uid", "==", user?.uid));
        onSnapshot(q, (snapshot) => {
          setMyEvents(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        });
      }
      // });
    };
    getEvents();
    console.log("List.tsx: myEvents -> ", myEvents, "user -> ", user?.uid);
    setLoading(false);
  }, [user]);

  if (loading) {
    return <Skeleton className="relative mt-10 h-48 w-full rounded-lg p-12" />;
  } else {
    if (user) {
      if (myEvents.length > 0) {
        return (
          <div className="mt-10">
            <h2 className="mb-2 mt-4 text-center text-3xl font-bold">
              My Events
            </h2>
            {myEvents.map((event, i) => (
              <EventCard key={i} event={event} i={i} />
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
      return (
        <div className="mt-10 rounded-lg p-12 text-center">
          <div>You need to login through Google to see your events</div>
          <button
            onClick={() => {
              signInWithGoogle();
            }}
            className="mx-auto mt-4 flex gap-2 rounded-lg border border-slate-200 px-4 py-2 text-slate-700 transition duration-150 hover:border-slate-400 hover:text-slate-900 hover:shadow"
          >
            {/* <img
              className="h-6 w-6"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
            /> */}
            <span>Login with Google</span>
          </button>
        </div>
      );
    }
  }
  // return <div>Going wrong here</div>;
};

export default List;
