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

const Event = () => {
  const [user] = useAuthState(auth);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
    // setTimeout(() => setShowInfo(false), 3000);
  };

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

  // useEffect(() => {
  //   // setLoading(true);
  //   const getEvents = async () => {
  //     const collectionRef = collection(db, "events");
  //     auth.onAuthStateChanged((user) => {
  //       if (user) {
  //         const q = query(
  //           collectionRef,
  //           where("uid", "==", user?.uid),
  //           where("target", "==", true)
  //         );
  //         onSnapshot(q, (snapshot) => {
  //           snapshot.docs.length > 0
  //             ? setMyEvents(snapshot.docs.map((doc) => doc.data()))
  //             : null;
  //         });
  //         calculateLeftDays();
  //       } else {
  //         setMyEvents([]);
  //       }
  //     });
  //   };
  //   getEvents();
  //   // setLoading(false);
  // }, [user]);

  if (loading) {
    return <Skeleton className="relative mt-10 h-48 w-full rounded-lg p-12" />;
  }

  if (!loading) {
    if (user) {
      if (!randomEvent) {
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
      } else if (lockedEvent || randomEvent) {
        return (
          <div className="relative mt-10 rounded-lg bg-violet-50 p-12">
            <strong className="block text-center text-2xl">
              {lockedEvent ? lockedEvent.eventTitle : randomEvent.eventTitle}
            </strong>
            <div
              onClick={() => toggleInfo()}
              className="absolute right-5 top-5 cursor-pointer p-1 text-xl duration-300 hover:opacity-50"
            >
              <AiOutlineInfoCircle />
            </div>
            {showInfo && (
              <div className="absolute right-5 top-5 mt-4 rounded-lg bg-violet-100 p-12 text-center">
                <span>
                  {lockedEvent
                    ? lockedEvent.description
                    : randomEvent.description}
                </span>
                <div
                  onClick={() => toggleInfo()}
                  className="absolute right-5 top-5 cursor-pointer text-xl hover:opacity-50"
                >
                  <AiFillCloseCircle />
                </div>
              </div>
            )}

            <div className="mt-4 text-center">
              {calculateLeftDays(
                lockedEvent
                  ? lockedEvent.eventDate.toDate()
                  : randomEvent.eventDate.toDate()
              ) <= 0 ? (
                <span className="text-center text-xl">
                  You Can Do It <span className="text-2xl">🎉</span>
                </span>
              ) : (
                <div>
                  <strong
                    className={`block text-5xl italic ${
                      calculateLeftDays(
                        lockedEvent
                          ? lockedEvent.eventDate.toDate()
                          : randomEvent.eventDate.toDate()
                      ) <= 3
                        ? "text-red-500"
                        : null
                    }`}
                  >
                    {calculateLeftDays(
                      lockedEvent
                        ? lockedEvent.eventDate.toDate()
                        : randomEvent.eventDate.toDate()
                    )}
                  </strong>
                  <span className="text-sm"> day left</span>
                </div>
              )}
            </div>

            {/* </Suspense> */}
            <div className="mt-4 text-right">
              <span>
                {lockedEvent
                  ? lockedEvent.eventDate.toDate().getMonth() + 1
                  : randomEvent.eventDate.toDate().getMonth() + 1}
                /
                {lockedEvent
                  ? lockedEvent.eventDate.toDate().getDate()
                  : randomEvent.eventDate.toDate().getDate()}
                ,{" "}
                {lockedEvent
                  ? lockedEvent.eventDate.toDate().getFullYear()
                  : randomEvent.eventDate.toDate().getFullYear()}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-end gap-2">
              {lockedEvent ? (
                <Button
                  onClick={() => {
                    alert("To refresh, unlock this quote first.");
                  }}
                  className={`cursor-not-allowed opacity-30 duration-300 hover:bg-slate-50 hover:text-slate-500 sm:w-auto`}
                  variant="ghost"
                >
                  <BiRefresh size={20} />
                </Button>
              ) : (
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
              )}

              {lockedEvent ? (
                <Button
                  onClick={() => {
                    unlockThisEvent();
                  }}
                  className={`text-red-500  duration-300 hover:bg-red-50 hover:text-red-500 sm:w-auto`}
                  variant="ghost"
                >
                  <Target size={20} />
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    lockThisEvent(randomEvent);
                  }}
                  className={`duration-300 hover:bg-red-50 hover:text-red-500 sm:w-auto`}
                  variant="ghost"
                >
                  <Target size={20} />
                </Button>
              )}
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
