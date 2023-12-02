import { ArrowUp } from "lucide-react";
import React from "react";

const ScreenToTopBtn = () => {
  return (
    <div
      aria-label="Scroll to top"
      className="absolute right-10 sm:right-5"
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
    >
      <ArrowUp className="fixed bottom-0 z-20 mb-24 h-10 w-10 cursor-pointer rounded-full bg-violet-50 p-2 text-violet-500 duration-300" />
    </div>
  );
};
export default ScreenToTopBtn;