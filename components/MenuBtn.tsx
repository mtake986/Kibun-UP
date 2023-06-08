import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { LucideLogOut, MenuIcon, User2 } from "lucide-react";
// import { hamburgerMenus } from "@/public/CONSTANTS";
import Link from "next/link";

import { LogInIcon } from "lucide-react";
import {
  BsChatQuote,
  BsChatQuoteFill,
  BsFlag,
  BsFlagFill,
  BsHouse,
  BsPerson,
  BsQuote,
} from "react-icons/bs";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/config/Firebase";
import { Button } from "./ui/button";
import { signOut } from "firebase/auth";
import { LogOut } from "lucide-react";
import { LogOutIcon } from "lucide-react";
import GoogleLoginBtn from "./utils/GoogleLoginBtn";
import LogOutBtn from "./LogOutBtn";
import LogInBtn from "./LogInBtn";

const hamburgerMenus = [
  {
    name: "Quote",
    link: "/quote",
    icon: <BsChatQuoteFill />,
  },
  {
    name: "Event",
    link: "/event",
    icon: <BsFlagFill />,
  },
  { name: "Login", link: "/login", icon: <LogInIcon /> },
];

type Anchor = "right";

export default function MenuBtn() {
  const [user] = useAuthState(auth);

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
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="flex flex-col justify-between gap-3 p-5">
        <div className="flex flex-col gap-3">
          <div className="cursor-pointer px-5 py-1 duration-300 hover:bg-violet-50">
            <Link
              href="/"
              className="flex cursor-pointer items-center gap-5 p-1"
            >
              <BsHouse />
              <span className="text-lg ">Home</span>
            </Link>
          </div>
          <div className="cursor-pointer px-5 py-1 duration-300 hover:bg-violet-50">
            <Link
              href="/quote"
              className="flex cursor-pointer items-center gap-5 p-1"
            >
              <BsChatQuote />
              <span className="text-lg ">Quote</span>
            </Link>
          </div>
          <div className="cursor-pointer px-5 py-1 duration-300 hover:bg-violet-50">
            <Link
              href="/event"
              className="flex cursor-pointer items-center gap-5 p-1"
            >
              <BsFlag />
              <span className="text-lg ">Event</span>
            </Link>
          </div>
          {user ? (
            <div className="cursor-pointer px-5 py-1 duration-300 hover:bg-violet-50">
              <Link
                className="flex cursor-pointer items-center gap-5 p-1"
                href={`/user/profile/${user?.uid}/`}
              >
                <User2 size={16} />
                Profile
              </Link>
            </div>
          ) : null}
        </div>
        {user ? <LogOutBtn /> : <GoogleLoginBtn />}
      </div>
    </Box>
  );

  return (
    <div>
      <MenuIcon
        className="cursor-pointer text-white duration-300 hover:opacity-70"
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
