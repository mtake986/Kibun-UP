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
import { pagination } from "@/utils/functions";
import PaginationBtns from "@/components/utils/PaginationBtns";

const EventList = () => {
  const [user] = useAuthState(auth);

  const { loginUserEvents, getLoginUserEvents } = useEvent();
  useEffect(() => {
    getLoginUserEvents();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  const { nPages, currentRecords } = pagination(currentPage, loginUserEvents);

  return (
    <div>
      {currentRecords && currentRecords.length >= 1 ? (
        <>
          {currentRecords.map((doc) => (
            <EventCard key={doc.id} event={doc} />
          ))}
          {nPages >= 2 && (
            <PaginationBtns
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      ) : (
        <div className="mt-10">
          <h2 className="mb-2 mt-4 text-center text-3xl font-bold">
            You have no events
          </h2>
        </div>
      )}
    </div>
  );
};

export default EventList;
