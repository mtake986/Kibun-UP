"use client";
import Link from "next/link";
import React, { useState } from "react";
import UrlLink from "../utils/UrlLink";

const Footer = () => {
  const [today, setToday] = useState<number>(new Date().getFullYear());
  return (
    <footer className="fixed bottom-0 z-10 m-auto mt-10 w-full bg-slate-50 py-1 text-center text-xs text-slate-400 dark:bg-slate-900 sm:text-sm">
      &copy; Copyright <span>{today}</span>{" "}
      <UrlLink
        href="/creator-info"
        clickOn="Masahiro Takechi"
        target="_self"
        className="text-sky-500 hover:underline"
      />
    </footer>
  );
};

export default Footer;
