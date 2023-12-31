import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BiDotsVertical, BiPaperPlane } from "react-icons/bi";
import { usePathname } from "next/navigation";
import UrlLink from "../utils/UrlLink";
import { FaTasks } from "react-icons/fa";
import { AiOutlineContacts } from "react-icons/ai";

const OtherLinks = () => {
  const pathname = usePathname();

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

  const item = (link: string, icon: React.JSX.Element, label: string) => {
    if (isBtnDisabled(pathname, `/${link}`)) {
      return (
        <button
          disabled={true}
          className="flex items-center gap-2 text-violet-500 opacity-50 transition duration-300 ease-in dark:text-white"
        >
          {icon} {label}
        </button>
      );
    } else {
      return (
        <button
          disabled={false}
          className="flex items-center gap-2 text-violet-500 transition duration-300 ease-in hover:opacity-70 dark:text-white"
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
      <DropdownMenuContent className="flex flex-col space-y-2 bg-white p-2 px-3 dark:bg-slate-900">
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
