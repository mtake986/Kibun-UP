"use client";
import React, { useState } from "react";
import RegisterForm from "../../components/quote/register/RegisterForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/Firebase";
import RegisterFormToggleBtn from "../../components/quote/register/RegisterFormToggleBtn";
import SelectTab from "@/components/quote/SwitchTab";
import GoogleLoginBtn from "@/components/utils/GoogleLoginBtn";

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

      <div className="relative mt-12">
        <h2 className="mb-2 mt-4 text-center text-3xl font-bold">Quotes</h2>
        <SelectTab />
      </div>
    </div>
  );
};

export default QuoteHomePage;
