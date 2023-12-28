import { fontDancingScript, fontMerriweather } from "@/components/utils/fonts";
import React from "react";
import { twMerge } from "tailwind-merge";

const Subtitle = () => {
  return (
    <p className={twMerge("text-center", fontDancingScript.className)}>
      Let the creator know how to make the service even better!!
    </p>
  );
};

export default Subtitle;
