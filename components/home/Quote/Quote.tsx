"use client";
import React, { useEffect, useState } from "react";
import { builtInQuotes } from "../../../public/CONSTANTS";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "@/app/config/Firebase";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";
import { IQuote } from "@/types/type";

const Quote = () => {
  const [todaysQuote, setTodaysQuote] = useState<IQuote[] | any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);
  const { signInWithGoogle } = useAuth();

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  // useEffect(() => {
  //   setLoading(true);
  //   onSnapshot(collection(db, "quotes"), (snapshot) => {
  //     snapshot.docs.length > 0
  //       ? setTodaysQuote(
  //           snapshot.docs[getRandomInt(snapshot.docs.length)].data()
  //         )
  //       : setTodaysQuote(builtInQuotes[0]);
  //     setLoading(false);
  //   });
  // }, []);

  useEffect(() => {
    setLoading(true);
    const getEvents = async () => {
      const collectionRef = collection(db, "quotes");
      auth.onAuthStateChanged((user) => {
        if (user) {
          const q = query(collectionRef, where("uid", "==", user?.uid), where('isDraft', '==', false));
          onSnapshot(q, (snapshot) => {
            setTodaysQuote(
              snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
          });
        }
      });
    };
    getEvents();
    setLoading(false);
  }, [user]);

  if (loading) {
    return (
      <div className="mt-6 flex-col items-center p-12">
        <Skeleton className="h-32 w-full" />
        <span className="mt-4 flex justify-end ">
          <Skeleton className="h-7 w-32" />
        </span>
      </div>
    );
  } else {
    if (user) {
      if (todaysQuote?.length === 0) {
        return (
          <div className="mt-10 rounded-lg bg-violet-50 p-12 text-center">
            <p>No event yet.</p>
            <Link
              href="/quote"
              className="cursor-pointer text-blue-400 underline duration-300 hover:opacity-70"
            >
              Click here to set an event
            </Link>
          </div>
        );
      } else if (todaysQuote?.length > 0) {
        return (
          <div className="mt-6 p-12">
            <strong className="text-xl">
              {todaysQuote[getRandomInt(todaysQuote.length)].quote}
            </strong>
            <div className="mt-4 text-right">
              <span>
                - {todaysQuote[getRandomInt(todaysQuote.length)].quote}
              </span>
            </div>
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
            <Image
              className="h-6 w-6"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
              width={24}
              height={24}
            />
            <span>Login with Google</span>
          </button>
        </div>
      );
    }
  }
  return <div>Going wrong here</div>;
};

export default Quote;
