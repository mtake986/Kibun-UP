import { fontDancingScript, fontMerriweather } from "@/components/utils/fonts";
import React from "react";
import { twMerge } from "tailwind-merge";

const Subtitle = () => {
  return (
    <p className={twMerge("text-center text-sm", fontDancingScript.className)}>
      Send a message to the creator!! Always welcome to hear from you ^^
    </p>
  );
}
export default Subtitle;
