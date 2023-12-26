import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BiDotsVertical,
  BiDotsVerticalRounded,
  BiPaperPlane,
} from "react-icons/bi";
import { usePathname } from "next/navigation";
import UrlLink from "../utils/UrlLink";
import Link from "next/link";
import { AiOutlineContacts } from "react-icons/ai";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/Firebase";
import { FaTasks } from "react-icons/fa";

const OtherLinks = () => {
  const today = new Date().getFullYear();
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

  function getLinkStyle(link: string) {
    return `text-violet-500 dark:text-white text-sm ${
      pathname === link
        ? "font-bold underline underline-offset-2 opacity-70 cursor-default"
        : "relative block w-fit after:absolute after:bottom-0.5 after:block after:h-[1px] after:w-full after:origin-center after:scale-x-0 after:bg-violet-500 after:transition after:duration-300 after:content-[''] after:hover:scale-x-100 dark:after:bg-white"
    }`;
  }

  const item = (link: string, icon: React.JSX.Element, label: string) => {
    if (isBtnDisabled(pathname, `/${link}`)) {
      return (
        <button
          disabled={true}
          className={`flex items-center gap-3 text-violet-500 opacity-50 transition duration-300 ease-in dark:text-white`}
        >
          {icon} {label}
        </button>
      );
    } else {
      return (
        <button
          disabled={false}
          className={`flex items-center gap-3 text-violet-500 transition duration-300 ease-in hover:opacity-70 dark:text-white`}
        >
          {icon} {label}
        </button>
      );
    }
  };

  type ItemProps = {
    href: string;
    target: string;
    clickOn: React.JSX.Element;
  };
  const items: ItemProps[] = [
    {
      href: `/contact`,
      target: "_self",
      clickOn: item("contact", <BiPaperPlane />, "Contact"),
    },
    {
      href: `/creator-info`,
      target: "_self",
      clickOn: item("creator-info", <AiOutlineContacts />, "Creator Info"),
    },
    {
      href: `/proposals`,
      target: "_self",
      clickOn: item("proposals", <FaTasks />, "Proposals"),
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <BiDotsVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white p-2 dark:bg-slate-900">
        {items.map((item: ItemProps) =>
          pathname === item.href ? (
            <span key={item.href}>{item.clickOn}</span>
          ) : (
            <UrlLink
              key={item.href}
              href={item.href}
              target={item.target}
              clickOn={item.clickOn}
            />
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OtherLinks;
