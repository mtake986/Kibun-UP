import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { MenuIcon } from "lucide-react";
import { BsChatQuote, BsFlag, BsHouse, BsPerson } from "react-icons/bs";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/Firebase";
import GoogleLoginBtn from "../utils/GoogleLoginBtn";
import UrlLink from "../utils/UrlLink";
import LogOutBtn from "./LogOutBtn";
import { Button } from "../ui/button";
import { AiOutlineContacts } from "react-icons/ai";
import { usePathname } from "next/navigation";

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
      return "flex items-center gap-3 text-violet-500";
    } else {
      return "flex items-center gap-3 text-violet-500 transition duration-300 ease-in hover:opacity-70";
    }
  };
  const HomeListItem = (
    <button
      disabled={isBtnDisabled(pathname, "/home")}
      className={`${btnStyle(pathname, "/home")}`}
    >
      <BsHouse />
            <span
        className={`${
          isBtnDisabled(pathname, "/home")
            ? "font-semibold underline underline-offset-2"
            : null
        }`}
      >Home</span>
    </button>
  );

  const QuoteListItem = (
    <button
      disabled={isBtnDisabled(pathname, "/quote")}
      className={`${btnStyle(pathname, "/quote")}`}
    >
      <BsChatQuote />
      <span
        className={`${
          isBtnDisabled(pathname, "/quote")
            ? "font-semibold underline underline-offset-2"
            : null
        }`}
      >
        Quote
      </span>
    </button>
  );

  const EventListItem = (
    <button
      disabled={isBtnDisabled(pathname, "/event")}
      className={`${btnStyle(pathname, "/event")}`}
    >
      <BsFlag />
      <span
        className={`${
          isBtnDisabled(pathname, "/event")
            ? "font-semibold underline underline-offset-2"
            : null
        }`}
      >
        Event
      </span>
    </button>
  );

  const ProfileListItem = (
    <button
      disabled={isBtnDisabled(pathname, "/profile")}
      className={`${btnStyle(pathname, "/profile")}`}
    >
      <BsPerson />
      <span
        className={`${
          isBtnDisabled(pathname, "/profile")
            ? "font-semibold underline underline-offset-2"
            : null
        }`}
      >
        Profile
      </span>
    </button>
  );

  const ContactListItem = (
    <button
      disabled={isBtnDisabled(pathname, "/contact")}
      className={`${btnStyle(pathname, "/contact")}`}
    >
      <AiOutlineContacts />
      <span
        className={`${
          isBtnDisabled(pathname, "/contact")
            ? "font-semibold underline underline-offset-2"
            : null
        }`}
      >
        Contact
      </span>
    </button>
  );

  const headerListItems = [
    {
      href: "/home",
      target: "_self",
      clickOn: HomeListItem,
    },
    {
      href: "/quote",
      target: "_self",
      clickOn: QuoteListItem,
    },
    {
      href: "/event",
      className: `flex items-center gap-3 ${
        pathname === "/event" && "font-semibold underline underline-offset-2"
      }`,
      target: "_self",
      clickOn: EventListItem,
    },
    {
      href: `/user/profile/${user?.uid}`,
      className: `flex items-center gap-3 ${
        pathname === "/profile" && "font-semibold underline underline-offset-2"
      }`,
      target: "_self",
      clickOn: ProfileListItem,
    },
    {
      href: `/contact`,
      className: `flex items-center gap-3 ${
        pathname === "/contact" && "font-semibold underline underline-offset-2"
      }`,
      target: "_self",
      clickOn: ContactListItem,
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
            className={item.className}
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
        className="cursor-pointer text-violet-500 duration-300 hover:opacity-70 dark:text-white"
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
