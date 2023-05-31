"use client";

import * as React from "react";
import Link from "next/link";
import { auth, provider, signInWithGoogle } from "../config/Firebase";
import { useAuth } from "../context/AuthContext";

export default function ButtonAppBar() {
  const { loginEmail, setLoginEmail } = useAuth();

  return (
    <header className="bg-violet-500 p-6">
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
        <div className="flex items-center justify-between">
            <div
              onClick={() => {
                signInWithGoogle()
                setLoginEmail(auth.currentUser?.email || '')
              }}
              // href="/login"
              className="text-violet-200 hover:text-white lg:mt-0 lg:inline-block"
            >
              Login
            </div>
        </div>
        {loginEmail && (<div>{loginEmail}</div>)}
      </nav>
    </header>
  );
}
