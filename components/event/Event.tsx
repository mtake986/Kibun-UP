'use client';
import RegisterForm from "@/components/event/register/RegisterForm";
import React, { useEffect, useState } from "react";
import RegisterFormToggleBtn from "@/components/event/register/RegisterFormToggleBtn";
import { useAuthState } from "react-firebase-hooks/auth";
import SwitchTab from "@/components/event/SwitchTab";
import GoogleLoginBtn from "@/components/utils/GoogleLoginBtn";
import HeadingTwo from "@/components/utils/HeadingTwo";
import { auth } from "@/config/Firebase";

export const metadata = {
  title: "Event",
};

const Event = () => {
  const [user] = useAuthState(auth);
  const [registerOpen, setRegisterOpen] = useState(false);

  if (!user) return <GoogleLoginBtn />;

  return (
    <div className="px-5 py-10 sm:mb-32 sm:p-0">
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
        <HeadingTwo text="Events" />
        <SwitchTab />
      </div>
    </div>
  );
};

export default Event;
