"use client";
import { auth } from "../../config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import MenuBtn from "./MenuBtn";
import ProfilePic from "./ProfilePic";
import UrlLink from "../utils/UrlLink";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
// import ThemeToggleBtn from "./ThemeToggleBtn";
import { fontRoboto } from "../utils/fonts";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { linkHoverEffect } from "@/data/CONSTANTS";

export default function Header() {
  const { fetchLoginUser, signInWithGoogle } = useAuth();
  const pathname = usePathname();
  useEffect(() => {
    fetchLoginUser(auth.currentUser);
  }, []);

  return (
    <header className="px-5 py-4 text-violet-500 shadow-md shadow-violet-100 dark:bg-slate-900 dark:text-white">
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
            className={`text-violet-500 dark:text-white ${
              pathname === "/quote"
                ? "font-bold underline underline-offset-2"
                : linkHoverEffect
            }`}
            clickOn="Quote"
          />
          <UrlLink
            href="/event"
            className={`text-violet-500 dark:text-white ${
              pathname === "/event"
                ? "font-bold underline underline-offset-2"
                : linkHoverEffect
            }`}
            target="_self"
            clickOn="Event"
          />
          <UrlLink
            href="/contact"
            className={`text-violet-500 dark:text-white ${
              pathname === "/contact"
                ? "font-bold underline underline-offset-2"
                : linkHoverEffect
            }`}
            target="_self"
            clickOn="Contact"
          />
        </div>
        <div className="hidden items-center justify-between sm:flex">
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
