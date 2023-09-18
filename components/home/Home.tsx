"use client";

import React, { useEffect, useState } from "react";
import Quote from "./QuoteFolder/Quote";
import Event from "./EventFolder/Event";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/Firebase";
import { useQuote } from "@/context/QuoteContext";
import { useAuth } from "@/context/AuthContext";
import GoogleLoginBtn from "../utils/GoogleLoginBtn";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const { loginUser, fetchLoginUser } = useAuth();
  const [user] = useAuthState(auth);

  useEffect(() => {
    setLoading(true);
    fetchLoginUser(user);
    setLoading(false);
  }, []);

  return (
    <>
      <Event />
      <Quote />
    </>
  );
};

export default Home;
