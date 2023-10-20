import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { MenuIcon } from "lucide-react";
// import { hamburgerMenus } from "@/data/CONSTANTS";
import { BsChatQuote, BsFlag, BsHouse, BsPerson } from "react-icons/bs";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/Firebase";
import GoogleLoginBtn from "../utils/GoogleLoginBtn";
import UrlLink from "../utils/UrlLink";
import LogOutBtn from "./LogOutBtn";
import { Button } from "../ui/button";
import { AiOutlineContacts } from "react-icons/ai";

type Anchor = "right";

export default function MenuBtn() {
  const [user] = useAuthState(auth);

  const headerListItems = [
    {
      href: "/",
      className: "flex items-center gap-5",
      target: "_self",
      clickOn: HomeListItem,
    },
    {
      href: "/quote",
      className: "flex items-center gap-5",
      target: "_self",
      clickOn: QuoteListItem,
    },
    {
      href: "/event",
      className: "flex items-center gap-5",
      target: "_self",
      clickOn: EventListItem,
    },
    {
      href: `/user/profile/${user?.uid}`,
      className: "flex items-center gap-5",
      target: "_self",
      clickOn: ProfileListItem,
    },
    {
      href: `/contact`,
      className: "flex items-center gap-5",
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
      <div className="flex flex-col justify-between gap-2 p-5">
        {/* <div className="flex flex-col gap-3"> */}
        {headerListItems.map((item, i) => (
          <Button
            key={i}
            className="flex items-center justify-start bg-white p-1 text-black duration-300 hover:bg-white hover:opacity-50"
          >
            <UrlLink
              href={item.href}
              className={item.className}
              target={item.target}
              clickOn={item.clickOn}
            />
          </Button>
        ))}
        {/* </div> */}
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

const HomeListItem = (
  <>
    <BsHouse />
    <span className="text-sm ">Home</span>
  </>
);

const QuoteListItem = (
  <>
    <BsChatQuote />
    <span className="text-sm">Quote</span>
  </>
);

const EventListItem = (
  <>
    <BsFlag />
    <span className="text-sm">Event</span>
  </>
);

const ProfileListItem = (
  <>
    <BsPerson />
    <span className="text-sm">Profile</span>
  </>
);

const ContactListItem = (
  <>
    <AiOutlineContacts />
    <span className="text-sm">Contact</span>
  </>
);
