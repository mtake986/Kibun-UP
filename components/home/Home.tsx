"use client";

import React, { useEffect, useState } from "react";
import Quote from "./QuoteFolder/Quote";
import Event from "./EventFolder/Event";
import { auth } from "@/config/Firebase";
import { useAuth } from "@/context/AuthContext";
import { useQuote } from "@/context/QuoteContext";
import UrlLink from "../utils/UrlLink";
import { User } from "firebase/auth";
import { useEvent } from "@/context/EventContext";
import Loading from "../utils/Loading";
import GoogleLoginBtn from "../utils/GoogleLoginBtn";

const Home = () => {
  const { loginUser, fetchLoginUser, isFetchingUser } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    getLockedQuote,
    updateRandomQuote,
    randomQuote,
    lockedQuote,
  } = useQuote();

  const {
    getLockedEvent,
    getRandomEvent,
    randomEvent,
    lockedEvent,
  } = useEvent();

  useEffect(() => {
    const fetchDocuments = async (user: User) => {
      !loginUser && fetchLoginUser(auth.currentUser);
      getLockedEvent();
      getRandomEvent();
      getLockedQuote();
      updateRandomQuote(user);
    };
    setLoading(true);
    auth.onAuthStateChanged((user) => {
      user
        ? fetchDocuments(user).then(() => {
            setLoading(false);
          })
        : setLoading(false);
    });
  }, [loginUser, loading]);

  if (loading || isFetchingUser) return <Loading />;

  if (!loading) {
    return (
      <>
        {loginUser && auth.currentUser ? (
          lockedEvent ? (
            <Event e={lockedEvent} />
          ) : randomEvent ? (
            <Event e={randomEvent} />
          ) : !lockedEvent && !randomEvent ? (
            <div className="mb-20 mt-10 rounded-lg p-12 text-center">
              <UrlLink
                href="/event"
                className="cursor-pointer text-sm text-blue-400 underline duration-300 hover:opacity-70"
                clickOn="You have no quotes yet."
                target="_self"
              />
            </div>
          ) : (
            <> </>
          )
        ) : (
          <GoogleLoginBtn />
        )}
        {loginUser && auth.currentUser ? (
          lockedQuote ? (
            <Quote q={lockedQuote} />
          ) : randomQuote ? (
            <Quote q={randomQuote} />
          ) : !lockedQuote && !randomQuote ? (
            <div className="mb-20 mt-10 rounded-lg p-12 text-center">
              <UrlLink
                href="/quote"
                className="cursor-pointer text-sm text-blue-400 underline duration-300 hover:opacity-70"
                clickOn="You have no quotes yet."
                target="_self"
              />
            </div>
          ) : (
            <></>
          )
        ) : (
          // <GoogleLoginBtn />
          <></>
        )}
      </>
    );
  }
};

export default Home;
