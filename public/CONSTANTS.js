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
  {
    quote:
      "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    person: "Winston Churchill",
  },
  {
    quote:
      "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
    person: "Steve Jobs",
  },
  {
    quote: "Your time is limited, don't waste it living someone else's life.",
    person: "Steve Jobs",
  },
  {
    quote:
      "The biggest risk is not taking any risk. In a world that is changing quickly, the only strategy that is guaranteed to fail is not taking risks.",
    person: "Mark Zuckerberg",
  },
  {
    quote:
      "The only person you are destined to become is the person you decide to be.",
    person: "Ralph Waldo Emerson",
  },
  {
    quote: "In the middle of every difficulty lies opportunity.",
    person: "Albert Einstein",
  },
  {
    quote:
      "The only limit to our realization of tomorrow will be our doubts of today.",
    person: "Franklin D. Roosevelt",
  },
  {
    quote:
      "Success is walking from failure to failure with no loss of enthusiasm.",
    person: "Winston Churchill",
  },
  {
    quote: "The best revenge is massive success.",
    person: "Frank Sinatra",
  },
  {
    quote:
      "I can't change the direction of the wind, but I can adjust my sails to always reach my destination.",
    person: "Jimmy Dean",
  },
  {
    quote: "Don't watch the clock; do what it does. Keep going.",
    person: "Sam Levenson",
  },
  {
    quote: "I find that the harder I work, the more luck I seem to have.",
    person: "Thomas Jefferson",
  },
  {
    quote:
      "The only thing standing between you and your goal is the story you keep telling yourself as to why you can't achieve it.",
    person: "Jordan Belfort",
  },
  {
    quote: "You miss 100% of the shots you don't take.",
    person: "Wayne Gretzky",
  },
  {
    quote: "The secret of getting ahead is getting started.",
    person: "Mark Twain",
  },
  {
    quote: "The best way to predict the future is to create it.",
    person: "Peter Drucker",
  },
  {
    quote: "If you want to lift yourself up, lift up someone else.",
    person: "Booker T. Washington",
  },
  {
    quote:
      "The only place where success comes before work is in the dictionary.",
    person: "Vidal Sassoon",
  },
  {
    quote:
      "I can't change the direction of the wind, but I can adjust my sails to always reach my destination.",
    person: "Jimmy Dean",
  },
  {
    quote: "Don't watch the clock; do what it does. Keep going.",
    person: "Sam Levenson",
  },
  {
    quote: "I find that the harder I work, the more luck I seem to have.",
    person: "Thomas Jefferson",
  },
  {
    quote:
      "The only thing standing between you and your goal is the story you keep telling yourself as to why you can't achieve it.",
    person: "Jordan Belfort",
  },
  {
    quote: "You miss 100% of the shots you don't take.",
    person: "Wayne Gretzky",
  },
  {
    quote: "The secret of getting ahead is getting started.",
    person: "Mark Twain",
  },
  {
    quote: "The best way to predict the future is to create it.",
    person: "Peter Drucker",
  },
  {
    quote: "If you want to lift yourself up, lift up someone else.",
    person: "Booker T. Washington",
  },
  {
    quote:
      "The only place where success comes before work is in the dictionary.",
    person: "Vidal Sassoon",
  },
  {
    quote:
      "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    person: "Winston Churchill",
  },
  {
    quote:
      "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
    person: "Steve Jobs",
  },
  {
    quote: "Your time is limited, don't waste it living someone else's life.",
    person: "Steve Jobs",
  },
  {
    quote:
      "The biggest risk is not taking any risk. In a world that is changing quickly, the only strategy that is guaranteed to fail is not taking risks.",
    person: "Mark Zuckerberg",
  },
  {
    quote:
      "The only person you are destined to become is the person you decide to be.",
    person: "Ralph Waldo Emerson",
  },
  {
    quote: "In the middle of every difficulty lies opportunity.",
    person: "Albert Einstein",
  },
  {
    quote:
      "The only limit to our realization of tomorrow will be our doubts of today.",
    person: "Franklin D. Roosevelt",
  },
  {
    quote:
      "Success is walking from failure to failure with no loss of enthusiasm.",
    person: "Winston Churchill",
  },
  {
    quote: "The best revenge is massive success.",
    person: "Frank Sinatra",
  },
  {
    quote:
      "I can't change the direction of the wind, but I can adjust my sails to always reach my destination.",
    person: "Jimmy Dean",
  },
  {
    quote: "Don't watch the clock; do what it does. Keep going.",
    person: "Sam Levenson",
  },
  {
    quote: "I find that the harder I work, the more luck I seem to have.",
    person: "Thomas Jefferson",
  },
  {
    quote:
      "The only thing standing between you and your goal is the story you keep telling yourself as to why you can't achieve it.",
    person: "Jordan Belfort",
  },
  {
    quote: "You miss 100% of the shots you don't take.",
    person: "Wayne Gretzky",
  },
  {
    quote: "The secret of getting ahead is getting started.",
    person: "Mark Twain",
  },
  {
    quote: "Believe in yourself and create your own destiny.",
    person: "Shinichi Kudo / Detective Conan",
  },
  {
    quote:
      "Don't be so quick to throw away your life. No matter how disgraceful or embarrassing it may be, you need to keep struggling to find your way out until the very end.",
    person: "Clare / Claymore",
  },
  {
    quote: "Hard work betrays none, but dreams betray many.",
    person: "Hikigaya Hachiman / My Teen Romantic Comedy SNAFU",
  },
  {
    quote: "In this world, wherever there is light – there are also shadows.",
    person: "Lelouch Lamperouge / Code Geass",
  },
  {
    quote:
      "A person grows up when he's able to overcome hardships. Protection is important, but there are some things that a person must learn on his own.",
    person: "Jiraiya / Naruto Shippuden",
  },
  {
    quote:
      "It's not the face that makes someone a monster; it's the choices they make with their lives.",
    person: "Naruto Uzumaki / Naruto Shippuden",
  },
  {
    quote: "No matter how deep the night, it always turns to day, eventually.",
    person: "Brook / One Piece",
  },
  {
    quote:
      "I don't want to conquer anything. I just think the guy with the most freedom in this whole ocean... Yohohoho! That is the Pirate King!",
    person: "Monkey D. Luffy / One Piece",
  },
  {
    quote: "Being weak is nothing to be ashamed of... Staying weak is!",
    person: "Sora / No Game No Life",
  },
  {
    quote:
      "If you have time to think of a beautiful end, then live beautifully until the end.",
    person: "Sakata Gintoki / Gintama",
  },
  {
    quote:
      "You don't have to feel sad. Because, you see, I'm looking forward to it.",
    person: "L / Death Note",
  },
  {
    quote: "Success is built upon a mountain of failure.",
    person: "Itachi Uchiha / Naruto Shippuden",
  },
  {
    quote:
      "The future is not a straight line. It is filled with many crossroads. There must be a future that we can choose for ourselves.",
    person: "Greed / Fullmetal Alchemist: Brotherhood",
  },
  {
    quote: "In this world, wherever there is light – there are also shadows.",
    person: "Lelouch Lamperouge / Code Geass",
  },
  {
    quote:
      "A person grows up when he's able to overcome hardships. Protection is important, but there are some things that a person must learn on his own.",
    person: "Jiraiya / Naruto Shippuden",
  },
  {
    quote:
      "It's not the face that makes someone a monster; it's the choices they make with their lives.",
    person: "Naruto Uzumaki / Naruto Shippuden",
  },
  {
    quote: "No matter how deep the night, it always turns to day, eventually.",
    person: "Brook / One Piece",
  },
  {
    quote:
      "I don't want to conquer anything. I just think the guy with the most freedom in this whole ocean... Yohohoho! That is the Pirate King!",
    person: "Monkey D. Luffy / One Piece",
  },
  {
    quote: "Being weak is nothing to be ashamed of... Staying weak is!",
    person: "Sora / No Game No Life",
  },
  {
    quote:
      "If you have time to think of a beautiful end, then live beautifully until the end.",
    person: "Sakata Gintoki / Gintama",
  },
  {
    quote:
      "You don't have to feel sad. Because, you see, I'm looking forward to it.",
    person: "L / Death Note",
  },
  {
    quote: "Success is built upon a mountain of failure.",
    person: "Itachi Uchiha / Naruto Shippuden",
  },
  {
    quote:
      "The future is not a straight line. It is filled with many crossroads. There must be a future that we can choose for ourselves.",
    person: "Greed / Fullmetal Alchemist: Brotherhood",
  },
  {
    quote: "Believe in yourself and create your own destiny.",
    person: "Shinichi Kudo / Detective Conan",
  },
  {
    quote:
      "Don't be so quick to throw away your life. No matter how disgraceful or embarrassing it may be, you need to keep struggling to find your way out until the very end.",
    person: "Clare / Claymore",
  },
  {
    quote: "Hard work betrays none, but dreams betray many.",
    person: "Hikigaya Hachiman / My Teen Romantic Comedy SNAFU",
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
