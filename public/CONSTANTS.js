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
    id: "j0b5S7t3vE",
    quote:
      "We cannot solve problems with the kind of thinking we employed when we came up with them.",
    person: "Albert Einstein",
  },
  {
    id: "J1o5bS4t6vE",
    quote:
      "I'm convinced that about half of what separates the successful entrepreneurs from the non-successful ones is pure perseverance.",
    person: "Steve Jobs",
  },
  {
    id: "e9nJ0o6y5t",
    quote: "My job is not to be easy on people. My job is to make them better",
    person: "Steve Jobs",
  },
  {
    id: "m8o7T4i6v0a",
    quote: "Your time is limited, don't waste it living someone else's life.",
    person: "Steve Jobs",
  },
  {
    id: "b4eJ2o0yS3t",
    quote: "Stay hungry, stay foolish.",
    person: "Steve Jobs",
  },
  {
    id: "o3nJ6e1d7y",
    quote:
      "Have the courage to follow your heart and intuition. They somehow know what you truly want to become.",
    person: "Steve Jobs",
  },
  {
    id: "d5oH9a0p6p",
    quote:
      "Let's go invent tomorrow rather than worrying about what happened yesterday.",
    person: "Steve Jobs",
  },
  {
    id: "g2eE6n4d7a",
    quote:
      "If today were the last day of your life, would you want to do what you are about to do today?",
    person: "Steve Jobs",
  },
  {
    id: "o8bS1t5a7r",
    quote:
      "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it.",
    person: "Steve Jobs",
  },
  {
    id: "w7a7yT3o0d",
    quote:
      "All our dreams can come true, if we have the courage to pursue them.",
    person: "Walt Disney",
  },
  {
    id: "e1i9n5s8tA",
    quote:
      "Don't limit yourself. Many people limit themselves to what they think they can do. You can go as far as your mind lets you. What you believe, remember, you can achieve.",
    person: "Mary Kay Ash",
  },
  {
    id: "t7r2u0t3h4A",
    quote:
      "The best time to plant a tree was 20 years ago. The second best time is now.",
    person: "Chinese Proverb",
  },
  {
    id: "i6n7s8p5i3rE",
    quote: "It's hard to beat a person who never gives up.",
    person: "Babe Ruth",
  },
  {
    id: "d0o9n1t8w8o",
    quote:
      "You've gotta dance like there's nobody watching, love like you'll never be hurt, sing like there's nobody listening, and live like it's heaven on earth.",
    person: "William W. Purkey",
  },
  {
    id: "h2a7p4p6i8n3E",
    quote:
      "Fairy tales are more than true: not because they tell us that dragons exist, but because they tell us that dragons can be beaten.",
    person: "Neil Gaiman",
  },
  {
    id: "r4e0l3i5t7yE",
    quote: "Everything you can imagine is real.",
    person: "Pablo Picasso",
  },
  {
    id: "f5a9i8l2u0r3E",
    quote:
      "When one door of happiness closes, another opens; but often we look so long at the closed door that we do not see the one which has been opened for us.",
    person: "Helen Keller",
  },
  {
    id: "t1i6m0e3i9s",
    quote: "Do one thing every day that scares you.",
    person: "Eleanor Roosevelt",
  },
  {
    id: "i8n9t7e7l5l3i",
    quote:
      "Smart people learn from everything and everyone, average people from their experiences, stupid people already have all the answers.",
    person: "Socrates",
  },
  {
    id: "l2e1a0r8n9i5n",
    quote:
      "It's no use going back to yesterday, because I was a different person then.",
    person: "Lewis Carroll",
  },
];



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

export const CategoriesQuoteFromAPI = [
  "age",
  "alone",
  "amazing",
  "anger",
  "architecture",
  "art",
  "attitude",
  "beauty",
  "best",
  "birthday",
  "business",
  "car",
  "change",
  "communications",
  "computers",
  "cool",
  "courage",
  "dad",
  "dating",
  "death",
  "design",
  "dreams",
  "education",
  "environmental",
  "equality",
  "experience",
  "failure",
  "faith",
  "family",
  "famous",
  "fear",
  "fitness",
  "food",
  "forgiveness",
  "freedom",
  "friendship",
  "funny",
  "future",
  "god",
  "good",
  "government",
  "graduation",
  "great",
  "happiness",
  "health",
  "history",
  "home",
  "hope",
  "humor",
  "imagination",
  "inspirational",
  "intelligence",
  "jealousy",
  "knowledge",
  "leadership",
  "learning",
  "legal",
  "life",
  "love",
  "marriage",
  "medical",
  "men",
  "mom",
  "money",
  "morning",
  "movies",
  "success",
];