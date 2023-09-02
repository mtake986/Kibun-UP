import { Button } from "@/components/ui/button";
import UrlLink from "@/components/utils/UrlLink";
import { useQuote } from "@/context/QuoteContext";
import { Plus } from "lucide-react";
import React from "react";



const RegisterFormToggleBtn = () => {
  return (
    <UrlLink
      clickOn={
        <Btn />
      }
      href="/quote/register"
      target="_self"
    />
  );
};

export default RegisterFormToggleBtn;



const Btn = () => {
  const {isRegisterFormOpen, toggleRegisterFormOpen} = useQuote();
  return (
    <div
      className={`absolute right-10 sm:right-5`}
      onClick={toggleRegisterFormOpen}
    >
      <Plus
        size={36}
        className="fixed bottom-0 z-20 mb-6 rotate-0 cursor-pointer rounded-full bg-violet-50 p-2 text-violet-500 duration-300 hover:rotate-90 hover:bg-violet-100 "
      />
    </div>
  );
}; 