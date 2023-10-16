"use client";

import React, { useEffect, useState } from "react";
import Quote from "./quote/Quote";
import Event from "./event/Event";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/Firebase";
import GoogleLoginBtn from "../utils/GoogleLoginBtn";
import { useAuth } from "@/context/AuthContext";

const Home = () => {
  const { loginUser, fetchLoginUser } = useAuth();

  const [user] = useAuthState(auth);

  useEffect(() => {
    fetchLoginUser(auth.currentUser);
  }, [user]);

  if (!loginUser) return <GoogleLoginBtn />;
  else {
    return (
      <>
        <Event />
        <Quote loginUser={loginUser} />
      </>
    );
  }
};

export default Home;
