"use client";
import { auth } from "../../config/Firebase";
import MenuBtn from "./MenuBtn";
import ProfilePic from "./ProfilePic";
import UrlLink from "../utils/UrlLink";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function Header() {
  const { fetchLoginUser } = useAuth();
  const pathname = usePathname();
  useEffect(() => {
    fetchLoginUser(auth.currentUser);
  }, []);

  function getLinkStyle(link: string) {
    return `text-violet-500 dark:text-white ${
      pathname === link
        ? "font-bold underline underline-offset-2"
        : "relative block w-fit after:absolute after:bottom-0.5 after:block after:h-[1px] after:w-full after:origin-center after:scale-x-0 after:bg-violet-500 after:transition after:duration-300 after:content-[''] after:hover:scale-x-100 dark:after:bg-white"
    }`;
  }


  return (
    <header className="px-5 py-4 text-violet-500 shadow-md shadow-violet-100 dark:bg-slate-950 dark:text-white">
      <nav className="mx-auto flex max-w-xl flex-wrap items-center justify-between ">
        <div className="mr-6 flex flex-shrink-0 items-center">
          <UrlLink
            clickOn="Kibun UP"
            href="/home"
            target="_self"
            className="text-xl font-semibold tracking-tight"
          />
        </div>
        <div className="hidden gap-3 text-sm sm:flex ">
          <UrlLink
            href="/quote"
            target="_self"
            className={getLinkStyle("/quote")}
            clickOn="Quote"
          />
          <UrlLink
            href="/event"
            className={getLinkStyle("/event")}
            target="_self"
            clickOn="Event"
          />
          <UrlLink
            href="/contact"
            className={getLinkStyle('/contact')}
            target="_self"
            clickOn="Contact"
          />
        </div>
        <div className="hidden items-center justify-between sm:flex gap-1">
          <ThemeSwitcher />
          <ProfilePic />
        </div>
        <div className="sm:hidden">
          <MenuBtn />
        </div>
      </nav>
    </header>
  );
}
