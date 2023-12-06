import { ArrowUp } from "lucide-react";
import React from "react";

const ScrollToTopBtn = () => {
  return (
    <div
      aria-label="Scroll to top"
      className="absolute right-4 sm:-right-2"
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
    >
      <ArrowUp className="fixed bottom-0 z-20 mb-20 h-8 w-8 rotate-0 cursor-pointer rounded-full bg-violet-500 p-1.5 text-white hover:-translate-y-1 duration-300 sm:mb-24 sm:h-9 sm:w-9" />
    </div>
  );
};
export default ScrollToTopBtn;