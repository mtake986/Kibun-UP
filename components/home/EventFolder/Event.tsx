"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEvent } from "@/context/EventContext";
import { Target } from "lucide-react";
import { BiRefresh } from "react-icons/bi";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import UrlLink from "@/components/utils/UrlLink";
import { auth } from "@/config/Firebase";
import HeadingFour from "@/components/utils/HeadingFour";
import { IEvent } from "@/types/type";

type Props = {
  e: IEvent;
};
const Event = ({ e }: Props) => {
  const [user] = useAuthState(auth);

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
    unlockThisEvent,
  } = useEvent();

  if (e) {
    return (
      <div className="relative bg-violet-50 px-5 py-10 sm:rounded-lg sm:p-12">
        {e.description ? (
          <HoverCard>
            <HoverCardTrigger className="absolute right-5 top-5 cursor-pointer p-1 text-xl duration-300 hover:opacity-50">
              <AiOutlineInfoCircle />
            </HoverCardTrigger>
            <HoverCardContent>{e.description}</HoverCardContent>
          </HoverCard>
        ) : null}

        <div className="text-center">
          {calculateLeftDays(e.eventDate.toDate()) <= 0 ? (
            <span className="text-center text-xl">
              You Can Do It <span className="text-2xl">🎉</span>
            </span>
          ) : (
            <div className="flex flex-col">
              <div className="flex items-end justify-center gap-2 italic">
                <strong
                  className={`block text-5xl ${
                    calculateLeftDays(e.eventDate.toDate()) <= 3
                      ? "text-red-500"
                      : null
                  }`}
                >
                  {calculateLeftDays(e.eventDate.toDate())}
                </strong>
                <span className="mb-1 text-sm">
                  {calculateLeftDays(e.eventDate.toDate()) >= 2
                    ? "days"
                    : "day"}
                </span>
              </div>
              <div className="my-1 text-center text-xs">until</div>
            </div>
          )}
        </div>

        <HeadingFour text={e.eventTitle} />

        {/* </Suspense> */}
        <div className="mt-4 text-right text-xs">
          <span>
            {e.eventDate.toDate().getMonth() + 1}/
            {e.eventDate.toDate().getDate()},{" "}
            {e.eventDate.toDate().getFullYear()}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-end gap-5">
          <BiRefresh
            onClick={() => {
              alert("To refresh, unlock this event first.");
            }}
            className={`cursor-not-allowed opacity-30 duration-300 hover:bg-slate-50 hover:text-slate-500`}
            size={20}
          />
          <Target
            onClick={() => {
              unlockThisEvent();
            }}
            className={`cursor-pointer text-red-500 duration-200 hover:text-red-500 hover:opacity-70`}
            size={16}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="mb-20 mt-10 rounded-lg p-12 text-center">
        <UrlLink
          href="/event"
          className="cursor-pointer text-sm text-blue-400 underline duration-300 hover:opacity-70"
          clickOn="You have no events yet."
          target="_self"
        />
      </div>
    );
  }
};

export default Event;
