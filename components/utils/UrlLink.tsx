"use client";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  href: string;
  target: string;
  clickOn: string | React.ReactNode;
  className?: string;
};

const UrlLink = ({ href, target, clickOn, className }: Props) => {

  return (
    <Link
      href={href}
      target={target}
      className={twMerge('cursor-pointer', className)} 
    >
      {clickOn}
    </Link>
  );
};

export default UrlLink;
