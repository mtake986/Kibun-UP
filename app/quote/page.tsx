"use client";
import React, { useState } from "react";
import RegisterForm from "../../components/quote/register/RegisterForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/Firebase";
import RegisterFormToggleBtn from "../../components/quote/register/RegisterFormToggleBtn";
import SelectTab from "@/components/quote/SelectTab";

const QuoteHomePage = () => {
  const [user] = useAuthState(auth);
  const [registerOpen, setRegisterOpen] = useState(false);
  return (
    <div>
      <div className="mb-10">
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
      </div>

      <div className="relative">
        <h2 className="mb-2 mt-4 text-center text-3xl font-bold">Quotes</h2>
        <SelectTab />
      </div>
    </div>
  );
};

export default QuoteHomePage;
