"use client";

import React, { useEffect, useState } from "react";
import Quote from "./quote/Quote";
import Event from "./event/Event";
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
