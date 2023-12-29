import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { MenuIcon } from "lucide-react";
import {
  BsActivity,
  BsChatQuote,
  BsFlag,
  BsHouse,
  BsPerson,
} from "react-icons/bs";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/Firebase";
import GoogleLoginBtn from "../utils/GoogleLoginBtn";
import UrlLink from "../utils/UrlLink";
import LogOutBtn from "./LogOutBtn";
import { AiOutlineContacts } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { capitalize } from "@mui/material";
import { twMerge } from "tailwind-merge";

type Anchor = "right";

export default function MenuBtn() {
  const [user] = useAuthState(auth);
  const pathname = usePathname();

  const isBtnDisabled = (pathname: string, link: string) => {
    if (pathname === link) return true;
    else return false;
  };

  const btnStyle = (pathname: string, link: string) => {
    if (isBtnDisabled(pathname, link)) {
      return "flex items-center gap-3 text-violet-500 dark:text-white font-bold";
    } else {
      return "flex items-center gap-3 text-violet-500 dark:text-white transition duration-300 ease-in hover:opacity-70";
    }
  };

  const item = (link: string, icon: React.JSX.Element) => {
    return (
      <button
        disabled={isBtnDisabled(pathname, `/${link}`)}
        className={twMerge(btnStyle(pathname, `/${link}`))}
      >
        {icon}
        <span
          className={twMerge(
            "text-sm",
            isBtnDisabled(pathname, `/${link}`)
              ? "font-semibold underline underline-offset-2"
              : ''
          )}
        >
          {capitalize(link)}
        </span>
      </button>
    );
  };

  const headerListItems = [
    {
      href: `/profile/${user?.uid}/activity`,
      target: "_self",
      clickOn: item("activity", <BsActivity />),
    },
  ];

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 150 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <ul className="flex min-h-screen flex-col items-center gap-5 py-10 dark:bg-slate-900">
        {/* <div className="flex flex-col gap-3"> */}
        {headerListItems.map((item, i) => (
          <UrlLink
            key={item.href}
            href={item.href}
            target={item.target}
            clickOn={item.clickOn}
          />
        ))}
        {/* </div> */}
        {user ? <LogOutBtn /> : <GoogleLoginBtn />}
      </ul>
    </Box>
  );

  return (
    <div>
      <MenuIcon
        className="w-5 cursor-pointer text-violet-500 duration-300 hover:opacity-70 dark:text-white"
        onClick={toggleDrawer("right", true)}
      />
      <Drawer
        anchor="right"
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    </div>
  );
}
