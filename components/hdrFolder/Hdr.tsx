"use client";

import * as React from "react";
import { auth } from "../../app/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import MenuBtn from "./MenuBtn";
import ProfilePic from "./ProfilePic";
import UrlLink from "../utils/UrlLink";
import { useAuth } from "@/context/AuthContext";

export default function Hdr() {

  const {
    signInWithGoogle,
  } = useAuth();
  const [user] = useAuthState(auth);

  return (
    <header className="bg-violet-500 py-4 px-5">
      <nav className="max-w-xl mx-auto flex flex-wrap items-center justify-between ">
        <div className="mr-6 flex flex-shrink-0 items-center text-white">
          <UrlLink
            clickOn="Kibun UP"
            href="/"
            target="_self"
            className="text-xl font-semibold tracking-tight"
          />
        </div>
        <div className="hidden gap-3 text-sm sm:flex ">
          <UrlLink
            href="/quote"
            target="_self"
            className="text-violet-200 hover:text-white lg:mt-0 lg:inline-block"
            clickOn="Quote"
          />
          <UrlLink
            href="/event"
            className="text-violet-200 hover:text-white lg:mt-0 lg:inline-block"
            target="_self"
            clickOn="Event"
          />
          <UrlLink
            href="/contact"
            className="text-violet-200 hover:text-white lg:mt-0 lg:inline-block"
            target="_self"
            clickOn="Contact"
          />
        </div>
        <div className="hidden items-center justify-between sm:flex">
          {user ? (
            <ProfilePic />
          ) : (
            <div
              onClick={() => {
                signInWithGoogle();
              }}
              // href="/login"
              className="cursor-pointer text-violet-200 duration-300 hover:text-white lg:mt-0 lg:inline-block"
            >
              Login
            </div>
          )}
        </div>
        <div className="sm:hidden">
          <MenuBtn />
        </div>
      </nav>
    </header>
  );
}
