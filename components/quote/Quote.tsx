"use client";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/Firebase";
import RegisterFormToggleBtn from "./RegisterFormToggleBtn";
import Tabs from "@/components/quote/Tabs";
import GoogleLoginBtn from "@/components/utils/GoogleLoginBtn";
import HeadingTwo from "@/components/utils/HeadingTwo";
import { useAuth } from "@/context/AuthContext";

import { useQuote } from "@/context/QuoteContext";
import MobileSortFilterForMineOpenBtn from "./mine/MobileSortFilterForMineOpenBtn";
import MobileSortFilterForNotMineOpenBtn from "./notMine/MobileSortFilterForNotMineOpenBtn";
import { displayErrorToast } from "@/functions/displayToast";
import LoadingIndicator from "../home/LoadingIndicator";

const Quote = () => {
  const [user] = useAuthState(auth);
  const { loginUser, fetchLoginUser } = useAuth();
  const {
    loginUserQuotes,
    getLoginUserQuotes,
    quotesNotMine,
    getLockedQuote,
    whichList,
    lockedQuote,
    getQuotesNotMine,
  } = useQuote();

  useEffect(() => {
    const fetchData = async () => {
      const fetchDocs = async () => {
        if (!loginUserQuotes || loginUserQuotes.length === 0) {
          getLoginUserQuotes();
        }
        if (!lockedQuote) getLockedQuote();
        if (!quotesNotMine || quotesNotMine.length === 0) getQuotesNotMine();
      };
      try {
        if (loginUser) {
          fetchDocs();
        } else {
          fetchLoginUser(auth.currentUser);
        }
      } catch (error) {
        displayErrorToast(error);
      }
    };
    fetchData();
  }, [user, loginUser]);

  if (!user) {
    return <GoogleLoginBtn />;
  }

  if (!loginUser) {
    return <LoadingIndicator text={"Loading a Login User..."} />;
  } else {
    return (
      <div className="px-5 py-10 sm:mb-32 sm:p-0">
        <div className="relative">
          <HeadingTwo text="Quotes" />
          <RegisterFormToggleBtn />
          {whichList === "mine" ? (
            <MobileSortFilterForMineOpenBtn />
          ) : whichList === "all" ? (
            <MobileSortFilterForNotMineOpenBtn />
          ) : null}
          <Tabs loginUser={loginUser} />
        </div>
      </div>
    );
  }
};

export default Quote;
