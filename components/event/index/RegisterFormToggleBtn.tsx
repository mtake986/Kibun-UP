import { Button } from "@/components/ui/button";
import UrlLink from "@/components/utils/UrlLink";
import { useEvent } from "@/context/EventContext";
import { Plus } from "lucide-react";
import React from "react";

const RegisterFormToggleBtn = () => {
  return (
    <UrlLink
      clickOn={
        <Btn />
      }
      href="/event/register"
      target="_self"
    />
  );
};

export default RegisterFormToggleBtn;

const Btn = () => {
  const { toggleRegisterFormOpen } = useEvent();

  return (
    <div
      className={`absolute right-10 sm:right-5 `}
      onClick={toggleRegisterFormOpen}
    >
      <Plus
        className="fixed w-10 h-10 bottom-0 z-20 mb-6 rotate-0 cursor-pointer rounded-full bg-violet-500 p-2 text-white duration-300 hover:rotate-90 hover:bg-violet-500"
      />
    </div>
  );
};