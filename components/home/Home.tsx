"use client";

import React, { useEffect, useState } from "react";
import Quote from "./QuoteFolder/Quote";
import Event from "./EventFolder/Event";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/Firebase";
import GoogleLoginBtn from "../utils/GoogleLoginBtn";

const Home = () => {

  const [user] = useAuthState(auth);

  if (!user) return <GoogleLoginBtn />;

  return (
    <>
      <Event />
      <Quote />
    </>
  );
};

export default Home;
