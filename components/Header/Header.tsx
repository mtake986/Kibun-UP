"use client";

import * as React from "react";
import Link from "next/link";
import { auth } from "../../app/config/Firebase";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import MenuBtn from "./MenuBtn";
import ProfilePic from "./ProfilePic";
<<<<<<< HEAD
import { ContactIcon } from "lucide-react";
import UrlLink from "../utils/UrlLink";
=======
>>>>>>> main

export default function ButtonAppBar() {
  // const { signInWithGoogle } = useAuth();
  const [user] = useAuthState(auth);
  const [signInWithGoogle, loading, error] = useSignInWithGoogle(auth);

  return (
    <header className="bg-violet-500 px-2 py-4 sm:p-4">
      <nav className="container mx-auto flex max-w-2xl flex-wrap items-center justify-between ">
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
<<<<<<< HEAD
            target="_self"
            clickOn="Event"
          />
          <UrlLink
            href="/contact"
            className="text-violet-200 hover:text-white lg:mt-0 lg:inline-block"
            target="_self"
            clickOn="Contact"
          />
=======
          >
            Event
          </Link>
>>>>>>> main
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
