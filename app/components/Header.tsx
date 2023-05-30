"use client";

import * as React from "react";
import Link from "next/link";
import MediaQuery from "react-responsive";

export default function ButtonAppBar() {
  return (
    <header>
      <nav className="flex flex-wrap items-center justify-between bg-violet-500 p-6">
        <div className="mr-6 flex flex-shrink-0 items-center text-white">
          <Link href="/">
            <span className="text-xl font-semibold tracking-tight">
              Kibun UP
            </span>
          </Link>
        </div>
        <MediaQuery minWidth={640}>
          <div className="flex gap-3 text-sm">
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
        </MediaQuery>
        <div className="flex items-center justify-between">
          <div>
            <Link
              href="/login"
              className="text-violet-200 hover:text-white lg:mt-0 lg:inline-block"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
