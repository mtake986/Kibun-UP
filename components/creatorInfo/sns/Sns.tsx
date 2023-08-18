import { Github, YoutubeIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { AiFillGithub, AiOutlineGithub } from "react-icons/ai";
import { BiLogoGithub } from "react-icons/bi";
import { BsGithub } from "react-icons/bs";
import SnsIcons from "./SnsIcons";

const Sns = () => {
  return (
    <div className="container mx-auto my-10 px-3 sm:my-14 sm:max-w-2xl sm:p-5">
      <div className="mb-6 flex flex-col items-center justify-between gap-8 sm:mb-10 sm:flex-row">
        <SnsIcons />
      </div>
    </div>
  );
};

export default Sns;
