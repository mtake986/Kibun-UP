import { Button } from "@/components/ui/button";
import UrlLink from "@/components/utils/UrlLink";
import { Plus } from "lucide-react";
import React from "react";

type Props = {
  registerOpen: boolean;
  setRegisterOpen: (prev: boolean) => void;
};

const Btn = ({ registerOpen, setRegisterOpen }: Props) => {
  return (
    <div
      className={`absolute sm:right-5 right-10`}
      onClick={() => setRegisterOpen(!registerOpen)}
    >
      <Plus size={48} className="rotate-0 hover:rotate-90 duration-300 p-2 rounded-full fixed bottom-0 z-20 mb-6 cursor-pointer bg-violet-50 text-violet-500 hover:bg-violet-100 " />
    </div>
  );
};

const RegisterFormToggleBtn = ({ registerOpen, setRegisterOpen }: Props) => {
  return (
    <UrlLink
      clickOn={
        <Btn registerOpen={registerOpen} setRegisterOpen={setRegisterOpen} />
      }
      href="/quote/register"
      target="_self"
    />
  );
};

export default RegisterFormToggleBtn;
