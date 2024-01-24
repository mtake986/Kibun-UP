import { LogInIcon } from "lucide-react";
import { BsChatQuoteFill, BsFlagFill } from "react-icons/bs";
import YouTubeIcon from "../public/icons/youtube.svg";
import InstagramIcon from "../public/icons/instagram.svg";
import TwitterIcon from "../public/icons/twitter.svg";
import GitHubIcon from "../public/icons/github.svg";
import {
  TypeAndOr,
  TypeSortBy,
  TypeSortFilterVariablesEvents,
} from "@/types/type";

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

export const DEFAULT_URL_FOR_RANDOM_QUOTE =
  "https://api.quotable.io/quotes/random";
export const DEFAULT_URL_FOR_ALL_QUOTES = "https://api.quotable.io/quotes";
export const DEFAULT_URL_TO_FETCH_TAGS = "https://api.quotable.io/tags";
export const DEFAULT_URL_TO_FETCH_AUTHORS =
  "https://api.quotable.io/authors?sortBy=name&order=asc&limit=150";
export const VALIDATION_STATUS = {
  FAIL: "fail",
  PASS: "pass",
};

export const linkHoverEffect =
  "relative block w-fit after:absolute after:bottom-0.5 after:block after:h-[1px] after:w-full after:origin-center after:scale-x-0 after:bg-violet-500 after:transition after:duration-300 after:content-[''] after:hover:scale-x-100 dark:after:bg-white";

export const QUOTES_PER_PAGE = [10, 25, 50, 100];

export const AND_OR: TypeAndOr[] = [
  {
    label: "and",
    value: "&",
  },
  {
    label: "or",
    value: "|",
  },
];
export const SORT_BYS: TypeSortBy[] = [
  {
    label: "Author",
    value: "author",
  },
  {
    label: "Content",
    value: "content",
  },
];

export const alphabetArrs = [
  "ABC".split(""),
  "DEF".split(""),
  "GHI".split(""),
  "JKL".split(""),
  "MNO".split(""),
  "PQRS".split(""),
  "TUV".split(""),
  "WXYZ".split(""),
];

export const insertFromLeft = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
};

export const insertFromRight = {
  hidden: { opacity: 0, x: 200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
};

export const insertFromBottom = {
  hidden: { opacity: 0, x: 0, y: 100 },
  enter: { opacity: 1, x: 0, y: 0 },
};
export const insertFromTop = {
  hidden: { opacity: 0, x: 0, y: -100 },
  enter: { opacity: 1, x: 0, y: 0 },
};

export const insertFromTopS = {
  hidden: { opacity: 0, x: 0, y: -20 },
  enter: { opacity: 1, x: 0, y: 0 },
};

export const MONTHS_IN_STR = [
  "Jan.",
  "Feb.",
  "Mar.",
  "Apr.",
  "May",
  "Jun.",
  "Jul.",
  "Aug.",
  "Sep.",
  "Oct.",
  "Nov.",
  "Dec.",
];

export const labelsForProposals: string[] = ["bug", "enhancement"];

export const SORT_FILTER_VARIABLES_EVENTS: TypeSortFilterVariablesEvents = {
  sortBy: "createdAt",
  order: "desc",
  isTagDisabled: true,
  searchTagName: "",
  displayOnly: ['future', 'past']
};
