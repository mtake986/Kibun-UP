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

export default function Header() {
  const { fetchLoginUser, signInWithGoogle } = useAuth();
  const pathname = usePathname();
  useEffect(() => {
    fetchLoginUser(auth.currentUser);
  }, []);

  return (
    <header className="bg-slate-50 px-5 py-4 text-violet-500 shadow-lg dark:bg-gray-900">
      <nav className="mx-auto flex max-w-xl flex-wrap items-center justify-between ">
        {/* <ThemeToggleBtn /> */}
        <div className="mr-6 flex flex-shrink-0 items-center">
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
            className={`text-violet-500 lg:mt-0 lg:inline-block ${
              pathname?.includes("/quote") && "underline font-semibold"
            }`}
            clickOn="Quote"
          />
          <UrlLink
            href="/event"
            className={`text-violet-500 lg:mt-0 lg:inline-block ${
              pathname?.includes("/event") && "underline font-semibold"
            }`}
            target="_self"
            clickOn="Event"
          />
          <UrlLink
            href="/contact"
            className={`text-violet-500 lg:mt-0 lg:inline-block ${
              pathname?.includes("/contact") && "underline font-semibold"
            }`}
            target="_self"
            clickOn="Contact"
          />
        </div>
        <div className="hidden items-center justify-between sm:flex">
          {auth.currentUser ? (
            <ProfilePic />
          ) : (
            <div
              onClick={() => {
                signInWithGoogle();
              }}
              // href="/login"
              className="hover cursor-pointer text-violet-200 duration-300 lg:mt-0 lg:inline-block"
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
