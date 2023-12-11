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
  const today = new Date().getFullYear();
  const pathname = usePathname();
  const [user] = useAuthState(auth);

  const isBtnDisabled = (pathname: string, link: string) =>
    pathname.includes(link);

  const item = (link: string, icon: React.JSX.Element) => {
    return (
      <button
        disabled={isBtnDisabled(pathname, `/${link}`)}
        className={`flex items-center gap-3 text-violet-500 dark:text-white transition duration-300 ease-in hover:opacity-70`}
      >
        {icon}
      </button>
    );
  };

  const icons = [
    <BsHouse key={"BsHouse"} />,
    <BsChatQuote key={"BsChatQuote"} />,
    <BsFlag key={"BsFlag"} />,
    <BsPerson key={"BsPerson"} />,
    <AiOutlineContacts key={"AiOutlineContacts"} />,
  ];

  const footerListItems = [
    {
      href: "/home",
      target: "_self",
      clickOn: item("home", icons[0]),
    },
    {
      href: "/quote",
      target: "_self",
      clickOn: item("quote", icons[1]),
    },
    {
      href: "/event",
      target: "_self",
      clickOn: item("event", icons[2]),
    },
    {
      href: `/profile/${user?.uid}`,
      target: "_self",
      clickOn: item(`/profile/${user?.uid}`, icons[3]),
    },
    {
      href: `/contact`,
      target: "_self",
      clickOn: item("contact", icons[4]),
    },
  ];

  return (
    <>
      {/* over mobile */}
      <footer className="bottom-0 z-10 m-auto mt-10 hidden w-full bg-slate-50 py-1 text-center text-xs text-slate-400 dark:bg-slate-900 sm:text-sm md:fixed">
        &copy; Copyright <span>{today}</span>{" "}
        <UrlLink
          href="/creator-info"
          clickOn="Masahiro Takechi"
          target="_self"
          className="text-sky-500 underline-offset-2 hover:underline"
        />
      </footer>

      {/* mobile */}
      <nav className="fixed bottom-0 z-10 mx-auto w-full bg-violet-50 py-2 dark:bg-slate-900 sm:hidden">
        <div className="m-auto flex w-full max-w-[150px] items-center justify-around gap-10 px-20">
          {footerListItems.map((item, i) => {
            if (pathname.includes(item.href)) {
              return (
                <button disabled={true} className="opacity-50" key={item.href}>{icons[i]}</button>
              );
            }
            return (
              <UrlLink
                key={item.href}
                href={item.href}
                target={item.target}
                clickOn={item.clickOn}
              />
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Footer;
