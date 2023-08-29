"use client";
import React, { useEffect, useState } from "react";
import RegisterForm from "./register/RegisterForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/Firebase";
import RegisterFormToggleBtn from "./register/RegisterFormToggleBtn";
import SelectTab from "@/components/quote/SwitchTab";
import GoogleLoginBtn from "@/components/utils/GoogleLoginBtn";
import HeadingTwo from "@/components/utils/HeadingTwo";
import { useAuth } from "@/context/AuthContext";

const Quote = () => {
  const [user] = useAuthState(auth);
  const [registerOpen, setRegisterOpen] = useState(false);
  const { loginUser, fetchLoginUser } = useAuth();

  useEffect(() => {
    fetchLoginUser(user);
  }, [user]);
  if (!user) return <GoogleLoginBtn />;

  return (
    <div className="py-10 px-5 sm:mb-32 sm:p-0">
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

export default Quote;
