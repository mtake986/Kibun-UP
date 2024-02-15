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
        <span className="text-lg">{icon}</span>
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
    <nav className="fixed bottom-0 z-10 w-full sm:hidden">
      <div className="m-2 mx-auto flex w-[95%] items-center justify-around rounded-md bg-violet-50 py-3 dark:bg-slate-900">
        {footerListItems.map((item, i) => {
          if (pathname.includes(item.href)) {
            return (
              <button
                disabled={true}
                className="text-violet-500 opacity-50 dark:text-white"
                key={item.href}
              >
                <span className="text-xl">{icons[i]}</span>
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
  );
};

export default Footer;
