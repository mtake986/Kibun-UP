import { ArrowUp } from "lucide-react";
import React from "react";

const ScreenToTopBtn = () => {
  return (
    <div
      className={`absolute right-10 sm:right-5`}
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
    >
      <ArrowUp
        className="fixed w-10 h-10 bottom-0 z-20 mb-20 cursor-pointer rounded-full bg-violet-500 p-2 text-white duration-300 hover:bg-violet-500"
      />
    </div>
  );
};
export default ScreenToTopBtn;