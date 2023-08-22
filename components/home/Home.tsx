"use client";

import React, { useEffect, useState } from "react";

import Quote from "./QuoteFolder/Quote";
import Event from "./EventFolder/Event";
import { getRandomNum } from "@/utils/functions";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/config/Firebase";
import { useQuote } from "@/context/QuoteContext";
import { useAuth } from "@/context/AuthContext";
import { IQuote } from "@/types/type";

const Home = () => {
  const {
    lockedQuote,
    getLockedQuote,
    getRandomQuote,
    fetchQuotesForHomePage,
    quotesForHomePage,
    getLoginUserQuotes,
    fetchMyBookmarks,
    randomQuote,
  } = useQuote();

  const [loading, setLoading] = useState<boolean>(true);

  const { loginUser, fetchLoginUser } = useAuth();
  const [user] = useAuthState(auth);

  useEffect(() => {
    setLoading(true);
    getLockedQuote(loginUser?.uid);
    getRandomQuote(setLoading);
    getLoginUserQuotes();
    fetchMyBookmarks();
    fetchLoginUser(user);
    loginUser && fetchQuotesForHomePage(loginUser);
    setLoading(false);
  }, []);

  return (
    <div className="">
      <Event />
      <Quote
        quote={lockedQuote ? lockedQuote : randomQuote}
        type={lockedQuote ? "lock" : "random"}
        loginUser={loginUser}
      />
    </div>
  );
};

export default Home;
