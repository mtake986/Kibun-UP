"use client";
import React, { useState } from "react";
import RegisterForm from "../../components/quote/register/RegisterForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/Firebase";
import RegisterFormToggleBtn from "../../components/quote/register/RegisterFormToggleBtn";
import SelectTab from "@/components/quote/SwitchTab";
import GoogleLoginBtn from "@/components/utils/GoogleLoginBtn";
import HeadingTwo from "@/components/utils/HeadingTwo";

const QuoteHomePage = () => {
  const [user] = useAuthState(auth);
  const [registerOpen, setRegisterOpen] = useState(false);

  if (!user) return <GoogleLoginBtn />;

  return (
    <div>
      {user &&
        (registerOpen ? (
          <RegisterForm
            registerOpen={registerOpen}
            setRegisterOpen={setRegisterOpen}
          />
        ) : (
          <RegisterFormToggleBtn
            registerOpen={registerOpen}
            setRegisterOpen={setRegisterOpen}
          />
        ))}
      <div className="relative mt-10">
        <HeadingTwo text="Quotes" />
        <SelectTab />
      </div>
    </div>
  );
};

export default QuoteHomePage;
