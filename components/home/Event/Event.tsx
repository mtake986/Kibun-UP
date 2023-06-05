"use client";
import React, { Suspense, useEffect, useState } from "react";
import { builtInEvents } from "@/public/CONSTANTS";
import { AiOutlineInfoCircle, AiFillCloseCircle } from "react-icons/ai";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/app/config/Firebase";
import { IEvent } from "@/types/type";
import { getRandomInt } from "@/utils/functions";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const Event = () => {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [leftDays, setLeftDays] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(true);
  const [myEvents, setMyEvents] = useState<IEvent[] | any>();

  const toggleInfo = () => {
    setShowInfo(!showInfo);
    // setTimeout(() => setShowInfo(false), 3000);
  };

  function calculateLeftDays(): number {
    const today = new Date();
    if (myEvents) {
      if (myEvents[0].eventDate.toDate() < today) {
        // setLeftDays(-1);
        return -1;
      } else {
        const diffTime = Math.abs(
          myEvents[0]?.eventDate.toDate().getTime() - today.getTime()
        );
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;
        // setLeftDays(diffDays);
        return diffDays;
      }
    } else {
      return 0;
    }
  }

  useEffect(() => {
    const getEvents = async () => {
      setLoading(true);
      onSnapshot(collection(db, "events"), (snapshot) => {
        snapshot.docs.length > 0
          ? setMyEvents(snapshot.docs.map((doc) => doc.data()))
          : console.log(builtInEvents[0]);
      });
      calculateLeftDays();
      setLoading(false);
    };
    getEvents();
  }, []);

  if (loading) {
    return <Skeleton className="relative mt-10 h-48 w-full rounded-lg p-12" />;
  }

  if (!loading && !myEvents) {
    return (
      <div className="text-center mt-10 rounded-lg bg-violet-50 p-12">
        <p>No event yet.</p>
        <Link
          href="/event"
          className="cursor-pointer text-blue-400 underline duration-300 hover:opacity-70"
        >
          Click here to set an event
        </Link>
      </div>
    );
  }

  if (!loading && myEvents) {
    return (
      <div className="relative mt-10 rounded-lg bg-violet-50 p-12">
        <strong className="block text-center text-4xl">
          {myEvents[0].eventTitle}
        </strong>
        <div
          onClick={() => toggleInfo()}
          className="absolute right-5 top-5 cursor-pointer p-1 text-xl duration-300 hover:opacity-50"
        >
          <AiOutlineInfoCircle />
        </div>
        {showInfo && (
          <div className="absolute right-5 top-5 mt-4 rounded-lg bg-violet-100 p-12 text-center">
            <span>{myEvents[0].description}</span>
            <div
              onClick={() => toggleInfo()}
              className="absolute right-5 top-5 cursor-pointer text-xl hover:opacity-50"
            >
              <AiFillCloseCircle />
            </div>
          </div>
        )}

        <div className="mt-4 text-center">
          {calculateLeftDays() <= 0 ? (
            <span className="text-center text-xl">
              You Can Do It <span className="text-2xl">🎉</span>
            </span>
          ) : (
            <div>
              <strong
                className={`block text-3xl ${
                  calculateLeftDays() <= 3 ? "text-red-500" : null
                }`}
              >
                {calculateLeftDays()}
              </strong>
              <span className="text-sm"> day left</span>
            </div>
          )}
        </div>

        {/* </Suspense> */}
        <div className="mt-4 text-right">
          <span>
            {myEvents[0].eventDate.toDate().getMonth() + 1}/
            {myEvents[0].eventDate.toDate().getDate()},{" "}
            {myEvents[0].eventDate.toDate().getFullYear()}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export default Event;
