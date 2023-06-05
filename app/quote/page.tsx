'use client';
import React, { useState } from "react";
import RegisterForm from "../../components/quote/register/RegisterForm";
import List from "@/components/quote/list/List";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/Firebase";
import RegisterFormToggleBtn from "../../components/quote/register/RegisterFormToggleBtn";

const QuoteHomePage = () => {
  const [user] = useAuthState(auth);
  const [registerOpen, setRegisterOpen] = useState(false);
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
      <List />
    </div>
  );
};

export default QuoteHomePage;
