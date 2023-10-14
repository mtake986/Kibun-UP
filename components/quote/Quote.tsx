"use client";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/Firebase";
import RegisterFormToggleBtn from "./RegisterFormToggleBtn";
import SelectTab from "@/components/quote/SwitchTab";
import GoogleLoginBtn from "@/components/utils/GoogleLoginBtn";
import HeadingTwo from "@/components/utils/HeadingTwo";
import { useAuth } from "@/context/AuthContext";

import { useQuote } from "@/context/QuoteContext";
import MobileSortFilterForMineOpenBtn from "./mine/MobileSortFilterForMineOpenBtn";
import MobileSortFilterForNotMineOpenBtn from "./notMine/MobileSortFilterForNotMineOpenBtn";


const Quote = () => {
  const [user] = useAuthState(auth);
  const { fetchLoginUser } = useAuth();

  const { whichList } = useQuote();

  useEffect(() => {
    fetchLoginUser(user);
  }, [user]);
  if (!user) return <GoogleLoginBtn />;

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

        <SelectTab />
      </div>
    </div>
  );
};

export default Quote;
