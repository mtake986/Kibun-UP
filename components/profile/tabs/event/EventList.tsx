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
  if (loading) {
    return <Skeleton className="relative mt-10 h-48 w-full rounded-lg p-12" />;
  } else {
    if (user) {
      if (value) {
        return (
          <div>
            {" "}
            {error ? <strong>Error: {JSON.stringify(error)}</strong> : null}
            {loading ? <span>Collection: Loading...</span> : null}
            {value && (
              <div>
                <div>Collection:{value.size}</div>
                {value.docs.map((doc) => (
                  <EventCard
                    key={doc.id}
                    event={{ id: doc.id, ...doc.data() }}
                  />
                ))}
              </div>
            )}
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
        <GoogleLoginBtn />
      );
    }
  }
  // return <div>Going wrong here</div>;
};

export default EventList;
