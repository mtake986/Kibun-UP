"use client";
import UrlLink from "../utils/UrlLink";
import { usePathname } from "next/navigation";
import { BsChatQuote, BsFlag, BsHouse, BsPerson } from "react-icons/bs";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/Firebase";
import OtherLinks from "./OtherLinks";

const Footer = () => {
  // const today = new Date().getFullYear();
  const pathname = usePathname();
  const [user] = useAuthState(auth);

  const isBtnDisabled = (pathname: string, link: string) => {
    // Check for static links
    if (link.startsWith("/profile/")) {
      // For dynamic links like /profile/:uid, check if pathname starts with the base path
      const basePath = "/profile/";
      if (pathname.startsWith(basePath)) {
        const uid = pathname.slice(basePath.length);
        // Assuming any non-empty string is a valid UID
        return uid.length > 0;
      }
      return false;
    }
    // Exact match for static paths
    return pathname === link;
  };

  const item = (link: string, icon: React.JSX.Element) => {
    return (
      <button
        disabled={isBtnDisabled(pathname, `/${link}`)}
        className="flex items-center gap-3 text-violet-500 transition duration-300 ease-in hover:opacity-70 dark:text-white"
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
  ];

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
      href: `/profile/${user?.uid}`,
      target: "_self",
      clickOn: item(`/profile/${user?.uid}`, <BsPerson />),
    },
  ];

  return (
    <>
      {/* over mobile */}
      {/* <footer className="bottom-0 z-10 m-auto mt-10 hidden w-full bg-slate-50 py-1 text-center text-xs text-slate-400 dark:bg-slate-900 sm:text-sm md:fixed">
        &copy; Copyright <span>{today}</span>{" "}
        <UrlLink
          href="/creator-info"
          clickOn="Masahiro Takechi"
          target="_self"
          className="text-sky-500 underline-offset-2 hover:underline"
        />
      </footer> */}

      {/* mobile */}
      <nav className="fixed bottom-0 z-10 mx-auto w-full bg-violet-50 py-2 dark:bg-slate-900 sm:hidden">
        <div className="m-auto flex w-full items-center justify-around px-5">
          {footerListItems.map((item, i) => {
            if (pathname.includes(item.href)) {
              return (
                <button disabled={true} className="opacity-50 text-violet-500" key={item.href}>
                  {icons[i]}
                </button>
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
          <OtherLinks />
        </div>
      </nav>
    </>
  );
};

export default Footer;
