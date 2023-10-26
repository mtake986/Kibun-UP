import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

type Props = {
  href: string;
  target: string;
  clickOn: string | React.ReactNode;
  className?: string;
};

const UrlLink = (props: Props) => {
  return (
    <Link
      href={props.href}
      target={props.target}
      className={`${props.className} cursor-pointer`}
    >
      {props.clickOn}
    </Link>
  );
};

export default UrlLink;
