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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    loginUserQuotes,
    getLoginUserQuotes,
    quotesNotMine,
    getLockedQuote,
    whichList,
    handleWhichList,
    lockedQuote,
    getQuotesNotMine,
  } = useQuote();

  useEffect(() => {
    const fetchDocs = async () => {
      if (!loginUser) fetchLoginUser(user);
    };
    const fetchQuotes = async () => {
      if (loginUserQuotes.length === 0) getLoginUserQuotes();
      if (!lockedQuote) getLockedQuote();
      if (quotesNotMine.length === 0) getQuotesNotMine();
    };
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await fetchDocs();
        await fetchQuotes();
      } catch (error) {
        displayErrorToast(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (isLoading) {
    return <LoadingIndicator text={"Loading a Login User..."} />;
  } else {
    if (!loginUser) return <GoogleLoginBtn />;
    else {
      return (
        <div className="px-5 py-10 sm:mb-32 sm:p-0">
          <div className="relative">
            <HeadingTwo text="Quotes" />
            <RegisterFormToggleBtn />
            {whichList === "yours" ? (
              <MobileSortFilterForMineOpenBtn />
            ) : whichList === "all" ? (
              <MobileSortFilterForNotMineOpenBtn />
            ) : null}

            <Tabs loginUser={loginUser} />
          </div>
        </div>
      );
    }
  }
};

export default Quote;
