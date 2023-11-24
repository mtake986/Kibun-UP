import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

type Props = {
  href: string;
  target: string;
  clickOn: string | React.ReactNode;
  className?: string;
};

const UrlLink = ({href, target, clickOn, className}: Props) => {
  return (
    <Link
      href={href}
      target={target}
      className={`${className} cursor-pointer`}
    >
      {clickOn}
    </Link>
  );
};

export default UrlLink;
