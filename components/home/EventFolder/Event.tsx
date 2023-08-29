"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEvent } from "@/context/EventContext";
import { Button } from "@/components/ui/button";
import { Target } from "lucide-react";
import { BiRefresh } from "react-icons/bi";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import UrlLink from "@/components/utils/UrlLink";
import { auth } from "@/config/Firebase";
import HeadingThree from "@/components/utils/HeadingThree";
import HeadingFive from "@/components/utils/HeadingFive";
import HeadingFour from "@/components/utils/HeadingFour";

const Event = () => {
  const [user] = useAuthState(auth);
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
    setRandomEvent,
    setLockedEvent,
  } = useEvent();

  useEffect(() => {
    setLoading(true);
    setRandomEvent(undefined);
    setLockedEvent(undefined);
    getLockedEvent();
    if (user) getRandomEvent(user.uid);
    setLoading(false);
  }, [user]);

  if (loading) {
    return (
      <Skeleton className="relative h-64 w-full rounded-lg p-12 sm:mt-10" />
    );
  }

  if (!loading) {
    if (user) {
      if (!lockedEvent && !randomEvent) {
        return (
          <div className="flex h-64 flex-col items-center justify-center rounded-lg bg-violet-50 p-12 text-center sm:mt-10">
            <p>You have no events yet.</p>
            <UrlLink
              href="/event"
              className="cursor-pointer text-blue-400 underline duration-300 hover:opacity-70"
              target="_self"
              clickOn="Click here to set an event"
            />
          </div>
        );
      } else if (lockedEvent) {
        return (
          <div className="relative bg-violet-50 px-5 py-10 sm:mt-10 sm:rounded-lg sm:p-12">
            {lockedEvent.description ? (
              <HoverCard>
                <HoverCardTrigger className="absolute right-5 top-5 cursor-pointer p-1 text-xl duration-300 hover:opacity-50">
                  <AiOutlineInfoCircle />
                </HoverCardTrigger>
                <HoverCardContent>{lockedEvent.description}</HoverCardContent>
              </HoverCard>
            ) : null}

            <div className="text-center italic">
              {calculateLeftDays(lockedEvent.eventDate.toDate()) <= 0 ? (
                <span className="text-center text-xl">
                  You Can Do It <span className="text-2xl">🎉</span>
                </span>
              ) : (
                <div className="flex items-end justify-center gap-2">
                  <strong
                    className={`block text-5xl ${
                      calculateLeftDays(lockedEvent.eventDate.toDate()) <= 3
                        ? "text-red-500"
                        : null
                    }`}
                  >
                    {calculateLeftDays(lockedEvent.eventDate.toDate())}
                  </strong>
                  <span className="mb-1 text-sm">
                    {calculateLeftDays(lockedEvent.eventDate.toDate()) >= 2
                      ? "days"
                      : "day"}
                  </span>
                </div>
              )}
            </div>

            <div className="text-center text-sm">until</div>
            <HeadingFour text={lockedEvent.eventTitle} />

            {/* </Suspense> */}
            <div className="mt-4 text-right text-xs">
              <span>
                {lockedEvent.eventDate.toDate().getMonth() + 1}/
                {lockedEvent.eventDate.toDate().getDate()},{" "}
                {lockedEvent.eventDate.toDate().getFullYear()}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-end gap-5">
              <BiRefresh
                onClick={() => {
                  alert("To refresh, unlock this event first.");
                }}
                className={`cursor-not-allowed opacity-30 duration-300 hover:bg-slate-50 hover:text-slate-500`}
                size={24}
              />
              <Target
                onClick={() => {
                  unlockThisEvent();
                }}
                className={`text-red-500 duration-200 hover:text-red-500 hover:opacity-70`}
                size={20}
              />
            </div>
          </div>
        );
      } else if (randomEvent) {
        return (
          <div className="relative bg-violet-50 px-5 py-10 sm:mt-10 sm:rounded-lg sm:p-12">
            {randomEvent.description ? (
              <HoverCard>
                <HoverCardTrigger className="absolute right-5 top-5 cursor-pointer p-1 text-xl duration-300 hover:opacity-50">
                  <AiOutlineInfoCircle />
                </HoverCardTrigger>
                <HoverCardContent>{randomEvent.description}</HoverCardContent>
              </HoverCard>
            ) : null}

            <div className="text-center">
              {calculateLeftDays(randomEvent.eventDate.toDate()) <= 0 ? (
                <span className="text-center text-xl">
                  You Can Do It <span className="text-2xl">🎉</span>
                </span>
              ) : (
                <div className="flex items-end">
                  <strong
                    className={`block text-5xl italic ${
                      calculateLeftDays(randomEvent.eventDate.toDate()) <= 3
                        ? "text-red-500"
                        : null
                    }`}
                  >
                    {calculateLeftDays(randomEvent.eventDate.toDate())}
                  </strong>
                  <span className="mb-3 text-sm">
                    {" "}
                    {calculateLeftDays(randomEvent.eventDate.toDate()) >= 2
                      ? "days"
                      : "day"}{" "}
                  </span>
                </div>
              )}
            </div>
            <div className="text-center">until</div>
            <HeadingFour text={randomEvent.eventTitle} />

            {/* </Suspense> */}
            <div className="mt-4 text-right text-xs">
              <span>
                {randomEvent.eventDate.toDate().getMonth() + 1}/
                {randomEvent.eventDate.toDate().getDate()},{" "}
                {randomEvent.eventDate.toDate().getFullYear()}
              </span>
            </div>
            <div className="mt-4 flex items-center justify-end gap-5">
              <BiRefresh
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    getRandomEvent(user?.uid);
                    setLoading(false);
                  }, 1000);
                }}
                className={`cursor-pointer duration-300 hover:opacity-50`}
                size={24}
              />

              <Target
                onClick={() => {
                  lockThisEvent(randomEvent);
                }}
                className={`cursor-pointer duration-300 hover:opacity-50`}
                size={20}
              />
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="flex h-64 flex-col items-center justify-center bg-violet-50 p-12 text-center sm:mt-10 sm:rounded-lg">
          {/* <Link
        href="/event"
        className="cursor-pointer text-blue-400 underline duration-300 hover:opacity-70"
      > */}
          Login to set events
          {/* </Link> */}
        </div>
      );
    }
  }
  return <div>Going wrong here</div>;
};

export default Event;
