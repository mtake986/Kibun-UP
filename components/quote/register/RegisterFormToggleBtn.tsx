import { Button } from "@/components/ui/button";
import React from "react";

type Props = {
  registerOpen: boolean;
  setRegisterOpen: (prev: boolean) => void;
};

const RegisterFormToggleBtn = ({ registerOpen, setRegisterOpen }: Props) => {
  return (
    <Button
      className={`mt-5 ${
        registerOpen
          ? "bg-red-100 text-red-500 hover:bg-red-100 hover:opacity-70"
          : "w-full bg-blue-100 text-blue-500 hover:bg-blue-50"
      }`}
      onClick={() => setRegisterOpen(!registerOpen)}
      type="submit"
    >
      {registerOpen ? "Close" : "Register"}
    </Button>
  );
};

export default RegisterFormToggleBtn;