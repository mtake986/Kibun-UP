"use client";

import * as React from "react";
import Link from "next/link";
import { auth } from "../app/config/Firebase";
import { useAuth } from "../app/context/AuthContext";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import MenuBtn from "./MenuBtn";
import ProfilePic from "./ProfilePic";

export default function ButtonAppBar() {
  // const { signInWithGoogle } = useAuth();
  // const [user] = useAuthState(auth);
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <header className="bg-violet-500 px-2 py-4 sm:p-4">
      <nav className="container mx-auto flex max-w-2xl flex-wrap items-center justify-between ">
        <div className="mr-6 flex flex-shrink-0 items-center text-white">
          <Link href="/">
            <span className="text-xl font-semibold tracking-tight">
              Kibun UP
            </span>
          </Link>
        </div>
        <div className="hidden gap-3 text-sm sm:flex ">
          <Link
            href="/quote"
            className="text-violet-200 hover:text-white lg:mt-0 lg:inline-block"
          >
            Quote
          </Link>
          <Link
            href="/event"
            className="text-violet-200 hover:text-white lg:mt-0 lg:inline-block"
          >
            Event
          </Link>
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
