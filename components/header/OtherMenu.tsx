import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BiDotsVertical, BiDotsVerticalRounded } from "react-icons/bi";
import { usePathname } from "next/navigation";
import UrlLink from "../utils/UrlLink";
import Link from "next/link";

const OtherMenu = () => {
  const pathname = usePathname();

  function getLinkStyle(link: string) {
    return `text-violet-500 dark:text-white text-sm ${
      pathname === link
        ? "font-bold underline underline-offset-2 opacity-70 cursor-default"
        : "relative block w-fit after:absolute after:bottom-0.5 after:block after:h-[1px] after:w-full after:origin-center after:scale-x-0 after:bg-violet-500 after:transition after:duration-300 after:content-[''] after:hover:scale-x-100 dark:after:bg-white"
    }`;
  }
  const items = [
    {
      href: "/contact",
      target: "_self",
      clickOn: "Contact",
      className: getLinkStyle("/contact"),
    },
    {
      href: "/creator-info",
      target: "_self",
      clickOn: "Creator Info",
      className: getLinkStyle("/creator-info"),
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <BiDotsVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white p-2 dark:bg-slate-900">
        {items.map((item) =>
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OtherMenu;
