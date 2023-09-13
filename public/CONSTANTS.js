import { LogInIcon } from "lucide-react";
import {
  BsChatQuote,
  BsChatQuoteFill,
  BsFlag,
  BsFlagFill,
  BsHouse,
  BsPerson,
} from "react-icons/bs";
import YouTubeIcon from "./icons/youtube.svg";
import InstagramIcon from "./icons/instagram.svg";
import TwitterIcon from "./icons/twitter.svg";
import GitHubIcon from "./icons/github.svg";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/Firebase";

export const builtInQuotes = [
  {
    quote:
      "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    person: "Nelson Mandela",
  },
  {
    quote: "The way to get started is to quit talking and begin doing.",
    person: "Walt Disney",
  },
  {
    quote:
      "If life were predictable it would cease to be life, and be without flavor.",
    person: "Eleanor Roosevelt",
  },
];

export const hamburgerMenus = [
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

export const tagColors = ["white", "red", "orange", "green", "blue", "purple"];

export const mySnsInfo = [
  {
    name: "YouTube",
    icon: YouTubeIcon,
    link: "https://www.youtube.com/@byui-masa",
  },
  {
    name: "Instagram",
    icon: InstagramIcon,
    link: "https://www.instagram.com/masa.us.univ/",
  },
  {
    name: "Twitter",
    icon: TwitterIcon,
    link: "https://twitter.com/byui_masa",
  },
  {
    name: "GitHub",
    icon: GitHubIcon,
    link: "https://github.com/mtake986",
  },
];
