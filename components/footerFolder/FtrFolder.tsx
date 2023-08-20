"use client";
import Link from "next/link";
import React, { useState } from "react";
import UrlLink from "../utils/UrlLink";

const FtrFolder = () => {
  const [today, setToday] = useState<number>(new Date().getFullYear());
  return (
    <footer className="absolute bottom-0 m-auto w-full py-1 mt-10 text-center text-sm text-slate-400">
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

export default FtrFolder;
