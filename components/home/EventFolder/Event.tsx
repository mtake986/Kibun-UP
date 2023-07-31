"use client";
import React, { useEffect, useState } from "react";
import { builtInEvents } from "@/public/CONSTANTS";
import { AiOutlineInfoCircle, AiFillCloseCircle } from "react-icons/ai";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "@/app/config/Firebase";
import { IEvent } from "@/types/type";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEvent } from "@/app/context/EventContext";
import { Button } from "@/components/ui/button";
import { Target } from "lucide-react";
import { BiRefresh } from "react-icons/bi";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const Event = () => {
  const [user] = useAuthState(auth);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  function calculateLeftDays(date: Date): number {
    const today = new Date();
    if (date < today) {
      // setLeftDays(-1);
      return -1;
    } else {
      const diffTime = Math.abs(date.getTime() - today.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;
      // setLeftDays(diffDays);
      return diffDays + 1;
    }
  }

  const {
    randomEvent,
    getRandomEvent,
    lockThisEvent,
    lockedEvent,
    unlockThisEvent,
    getLockedEvent,
  } = useEvent();

  useEffect(() => {
    setLoading(true);
    getLockedEvent();
    if (user) getRandomEvent(user.uid);
    console.log(randomEvent);
    setLoading(false);
  }, [user]);

  if (loading) {
    return <Skeleton className="relative mt-10 h-64 w-full rounded-lg p-12" />;
  }

  if (!loading) {
    if (user) {
      if (!lockedEvent && !randomEvent) {
        return (
          <div className="mt-10 rounded-lg bg-violet-50 p-12 text-center">
            <p>No event yet.</p>
            <Link
              href="/event"
              className="cursor-pointer text-blue-400 underline duration-300 hover:opacity-70"
            >
              Click here to set an event
            </Link>
          </div>
        );
      } else if (lockedEvent) {
        return (
          <div className="relative mt-10 rounded-lg bg-violet-50 p-12">
            <strong className="block text-center text-2xl">
              {lockedEvent.eventTitle}
            </strong>
            {lockedEvent.description ? (
              <HoverCard>
                <HoverCardTrigger className="absolute right-5 top-5 cursor-pointer p-1 text-xl duration-300 hover:opacity-50">
                  <AiOutlineInfoCircle />
                </HoverCardTrigger>
                <HoverCardContent>{lockedEvent.description}</HoverCardContent>
              </HoverCard>
            ) : null}

            <div className="mt-4 text-center">
              {calculateLeftDays(lockedEvent.eventDate.toDate()) <= 0 ? (
                <span className="text-center text-xl">
                  You Can Do It <span className="text-2xl">🎉</span>
                </span>
              ) : (
                <div>
                  <strong
                    className={`block text-5xl italic ${
                      calculateLeftDays(lockedEvent.eventDate.toDate()) <= 3
                        ? "text-red-500"
                        : null
                    }`}
                  >
                    {calculateLeftDays(lockedEvent.eventDate.toDate())}
                  </strong>
                  <span className="text-sm">
                    {calculateLeftDays(lockedEvent.eventDate.toDate()) >= 2
                      ? "days"
                      : "day"}{" "}
                    left
                  </span>
                </div>
              )}
            </div>

            {/* </Suspense> */}
            <div className="mt-4 text-right">
              <span>
                {lockedEvent.eventDate.toDate().getMonth() + 1}/
                {lockedEvent.eventDate.toDate().getDate()},{" "}
                {lockedEvent.eventDate.toDate().getFullYear()}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-end gap-2">
              <Button
                onClick={() => {
                  alert("To refresh, unlock this quote first.");
                }}
                className={`cursor-not-allowed opacity-30 duration-300 hover:bg-slate-50 hover:text-slate-500 sm:w-auto`}
                variant="ghost"
              >
                <BiRefresh size={20} />
              </Button>

              <Button
                onClick={() => {
                  unlockThisEvent();
                }}
                className={`text-red-500 duration-200 hover:text-red-500 hover:opacity-70 sm:w-auto`}
                variant="ghost"
              >
                <Target size={20} />
              </Button>
            </div>
          </div>
        );
      } else if (randomEvent) {
        return (
          <div className="relative mt-10 rounded-lg bg-violet-50 p-12">
            <strong className="block text-center text-2xl">
              {randomEvent.eventTitle}
            </strong>

            {randomEvent.description ? (
              <HoverCard>
                <HoverCardTrigger className="absolute right-5 top-5 cursor-pointer p-1 text-xl duration-300 hover:opacity-50">
                  <AiOutlineInfoCircle />
                </HoverCardTrigger>
                <HoverCardContent>{randomEvent.description}</HoverCardContent>
              </HoverCard>
            ) : null}

            <div className="mt-4 text-center">
              {calculateLeftDays(randomEvent.eventDate.toDate()) <= 0 ? (
                <span className="text-center text-xl">
                  You Can Do It <span className="text-2xl">🎉</span>
                </span>
              ) : (
                <div>
                  <strong
                    className={`block text-5xl italic ${
                      calculateLeftDays(randomEvent.eventDate.toDate()) <= 3
                        ? "text-red-500"
                        : null
                    }`}
                  >
                    {calculateLeftDays(randomEvent.eventDate.toDate())}
                  </strong>
                  <span className="text-sm">
                    {" "}
                    {calculateLeftDays(randomEvent.eventDate.toDate()) >= 2
                      ? "days"
                      : "day"}{" "}
                    left
                  </span>
                </div>
              )}
            </div>
            {/* </Suspense> */}
            <div className="mt-4 text-right">
              <span>
                {randomEvent.eventDate.toDate().getMonth() + 1}/
                {randomEvent.eventDate.toDate().getDate()},{" "}
                {randomEvent.eventDate.toDate().getFullYear()}
              </span>
            </div>
            <div className="mt-4 flex items-center justify-end gap-2">
              <Button
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    getRandomEvent(user?.uid);
                    setLoading(false);
                  }, 1000);
                }}
                className={` duration-300  hover:bg-blue-50 hover:text-blue-500 sm:w-auto`}
                variant="ghost"
              >
                <BiRefresh size={20} />
              </Button>
              <Button
                onClick={() => {
                  lockThisEvent(randomEvent);
                }}
                className={`duration-300 hover:opacity-50 sm:w-auto`}
                variant="ghost"
              >
                <Target size={20} />
              </Button>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="mt-10 rounded-lg bg-violet-50 p-12 text-center">
          {/* <Link
        href="/event"
        className="cursor-pointer text-blue-400 underline duration-300 hover:opacity-70"
      > */}
          login to set an event
          {/* </Link> */}
        </div>
      );
    }
  }
  return <div>Going wrong here</div>;
};

export default Event;
