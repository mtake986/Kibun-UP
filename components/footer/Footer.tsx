"use client";
import React, { useState } from "react";
import UrlLink from "../utils/UrlLink";
import { usePathname } from "next/navigation";
import { BsChatQuote, BsFlag, BsHouse, BsPerson } from "react-icons/bs";
import { AiOutlineContacts } from "react-icons/ai";
import { capitalize } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/Firebase";

const Footer = () => {
  const [today, setToday] = useState<number>(new Date().getFullYear());
  const pathname = usePathname();
  const [user] = useAuthState(auth);

  const isBtnDisabled = (pathname: string, link: string) => pathname.includes(link);

  const btnStyle = (pathname: string, link: string) => {
    if (isBtnDisabled(pathname, link)) {
      return "flex items-center gap-3 text-violet-500 dark:text-white font-bold";
    } else {
      return "flex items-center gap-3 text-violet-500 dark:text-white transition duration-300 ease-in hover:opacity-70";
    }
  };

  const item = (link: string, icon: React.JSX.Element) => {
    return (
      <button
        disabled={isBtnDisabled(pathname, `/${link}`)}
        className={`${btnStyle(pathname, `/${link}`)}`}
      >
        {icon}
      </button>
    );
  };

  const footerListItems = [
    {
      href: "/home",
      target: "_self",
      clickOn: item("home", <BsHouse />),
    },
    {
      href: "/quote",
      target: "_self",
      clickOn: item("quote", <BsChatQuote />),
    },
    {
      href: "/event",
      target: "_self",
      clickOn: item("event", <BsFlag />),
    },
    {
      href: `/user/profile/${user?.uid}`,
      target: "_self",
      clickOn: item("profile", <BsPerson />),
    },
    {
      href: `/contact`,
      target: "_self",
      clickOn: item("contact", <AiOutlineContacts />),
    },
  ];

  return (
    <>
      <footer className="bottom-0 z-10 m-auto mt-10 hidden w-full bg-slate-50 py-1 text-center text-xs text-slate-400 dark:bg-slate-900 sm:text-sm md:fixed">
        &copy; Copyright <span>{today}</span>{" "}
        <UrlLink
          href="/creator-info"
          clickOn="Masahiro Takechi"
          target="_self"
          className="text-sky-500 underline-offset-2 hover:underline"
        />
      </footer>

      <nav className="fixed bottom-0 z-10 mx-auto w-full bg-violet-50 py-2 sm:hidden">
        <div className="flex w-full items-center justify-center gap-5">
          {footerListItems.map((item, i) => (
            <UrlLink
              key={item.href}
              href={item.href}
              target={item.target}
              clickOn={item.clickOn}
            />
          ))}
        </div>
      </nav>
    </>
  );
};

export default Footer;
