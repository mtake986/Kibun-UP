import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { HomeIcon, MenuIcon, Quote } from "lucide-react";
// import { hamburgerMenus } from "@/public/CONSTANTS";
import Link from "next/link";

import { LogInIcon } from "lucide-react";
import { BsChatQuote, BsChatQuoteFill, BsFlag, BsFlagFill, BsHouse, BsQuote } from "react-icons/bs";
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
  const [state, setState] = React.useState({
    // top: false,
    // left: false,
    // bottom: false,
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
      <div className="flex flex-col gap-1 p-5">
        <div className="flex cursor-pointer items-center gap-5 rounded-lg px-5 py-1 duration-300 hover:bg-violet-50">
          <BsHouse />
          <Link href="/">
            <span className="text-lg ">Home</span>
          </Link>
        </div>
        <div className="flex cursor-pointer items-center gap-5 rounded-lg px-5 py-1 duration-300 hover:bg-violet-50">
          <BsChatQuote />
          <Link href="/quote">
            <span className="text-lg ">Quote</span>
          </Link>
        </div>
        <div className="flex cursor-pointer items-center gap-5 rounded-lg px-5 py-1 duration-300 hover:bg-violet-50">
          <BsFlag />
          <Link href="/event">
            <span className="text-lg ">Event</span>
          </Link>
        </div>
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
