import { LogInIcon } from "lucide-react";
import { BsChatQuoteFill, BsFlagFill } from "react-icons/bs";
import YouTubeIcon from "../public/icons/youtube.svg";
import InstagramIcon from "../public/icons/instagram.svg";
import TwitterIcon from "../public/icons/twitter.svg";
import GitHubIcon from "../public/icons/github.svg";

export const builtInEvents = [
  {
    id: "123",
    eventTitle: "birthday",
    place: "utah",
    description: "description",
    // eventDate: new Date('2011-05-30'),
    uid: "uid",
    createdAt: new Date(),
    updatedAt: new Date(),
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

export const tagColors = ["white", "red", "green", "blue", "violet"];

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


export const DEFAULT_URL_FOR_QUOTE =
  " https://api.quotable.io/quotes/random";
