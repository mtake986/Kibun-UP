import { Button } from "@/components/ui/button";
import UrlLink from "@/components/utils/UrlLink";
import { useEvent } from "@/context/EventContext";
import { Plus } from "lucide-react";
import React from "react";

const RegisterFormToggleBtn = () => {
  return <UrlLink clickOn={<Btn />} href="/event/register" target="_self" />;
};

export default RegisterFormToggleBtn;

const Btn = () => {
  const { toggleRegisterFormOpen } = useEvent();

  return (
    <div
      className={`absolute right-4 sm:-right-2`}
      onClick={toggleRegisterFormOpen}
    >
      <Plus className="fixed bottom-0 z-20 mb-10 h-8 w-8 rotate-0 cursor-pointer rounded-full bg-violet-500 p-1.5 text-white duration-300 hover:rotate-90 hover:bg-violet-500 sm:h-9 sm:w-9" />
    </div>
  );
};
