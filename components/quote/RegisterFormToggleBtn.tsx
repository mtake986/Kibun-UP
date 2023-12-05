
import UrlLink from "@/components/utils/UrlLink";
import { useQuote } from "@/context/QuoteContext";
import { Plus } from "lucide-react";
import React from "react";

const RegisterFormToggleBtn = () => {
  return <UrlLink clickOn={<Btn />} href="/quote/register" target="_self" />;
};

export default RegisterFormToggleBtn;

const Btn = () => {
  const { isRegisterFormOpen, toggleRegisterFormOpen } = useQuote();
  return (
    <div
      className={`absolute right-8 sm:right-5`}
      onClick={toggleRegisterFormOpen}
    >
      <Plus className="fixed bottom-0 z-20 mb-10 h-8 w-8 rotate-0 cursor-pointer rounded-full bg-violet-500 p-1.5 text-white duration-300 hover:rotate-90 hover:bg-violet-500 sm:h-10 sm:w-10" />
    </div>
  );
};
