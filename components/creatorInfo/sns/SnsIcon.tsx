import UrlLink from "@/components/utils/UrlLink";
import { Variants, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  snsInfo: {
    name: string;
    icon: any;
    link: string;
  };
}

const SnsIcon = ({ snsInfo }: Props) => {
  const image = (
    <Image src={snsInfo.icon} alt={snsInfo.name} className="mr-2 w-5 sm:w-6" />
  );
  return (
    <div>
      <UrlLink
        target="_blank"
        href={snsInfo.link}
        clickOn={image}
        />
    </div>
  );
};

export default SnsIcon;
