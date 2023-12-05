import { ArrowUp } from "lucide-react";
import React from "react";

const ScrollToTopBtn = () => {
  return (
    <div
      aria-label="Scroll to top"
      className="absolute right-8 sm:right-5"
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
    >
      <ArrowUp className="fixed bottom-0 z-20 mb-20 sm:mb-24 h-8 w-8 rotate-0 cursor-pointer rounded-full bg-violet-500 p-1.5 text-white duration-300 hover:rotate-90 hover:bg-violet-500 sm:h-10 sm:w-10" />
    </div>
  );
};
export default ScrollToTopBtn;