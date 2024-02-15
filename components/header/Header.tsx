"use client";
import { auth } from "../../config/Firebase";
import MenuBtn from "./MenuBtn";
import ProfilePic from "./ProfilePic";
import UrlLink from "../utils/UrlLink";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "./ThemeSwitcher";
import OtherMenu from "./OtherMenu";
import LogOutBtn from "./LogOutBtn";

export default function Header() {
  const { fetchLoginUser, loginUser } = useAuth();  
  const pathname = usePathname();
  useEffect(() => {
    fetchLoginUser(auth.currentUser);
  }, []);

  function getLinkStyle(link: string) {
    return `text-violet-500 dark:text-white text-sm ${
      pathname === link
        ? "font-bold underline underline-offset-2 opacity-70 cursor-default"
        : "relative block w-fit after:absolute after:bottom-0.5 after:block after:h-[1px] after:w-full after:origin-center after:scale-x-0 after:bg-violet-500 after:transition after:duration-300 after:content-[''] after:hover:scale-x-100 dark:after:bg-white"
    }`;
  }

  const headerItems = [
    {
      href: "/quote",
      target: "_self",
      clickOn: "Quote",
      className: getLinkStyle("/quote"),
    },
    {
      href: "/event",
      target: "_self",
      clickOn: "Event",
      className: getLinkStyle("/event"),
    },
    {
      href: `/profile/${loginUser?.uid}`,
      target: "_self",
      clickOn: "Profile",
      className: getLinkStyle(`/profile/${loginUser?.uid}`),
    },
  ];

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
          {headerItems.map((item) =>
            pathname === item.href ? (
              <span key={item.href} className={item.className}>
                {item.clickOn}
              </span>
            ) : (
              <UrlLink
                key={item.href}
                href={item.href}
                target={item.target}
                clickOn={item.clickOn}
                className={item.className}
              />
            )
          )}
          <OtherMenu />
        </div>
        <div className="flex items-center gap-3">
          <ThemeSwitcher />
          {pathname.includes(`/profile/${loginUser?.uid}`) ? <MenuBtn /> : <LogOutBtn />}
        </div>
      </nav>
    </header>
  );
}
