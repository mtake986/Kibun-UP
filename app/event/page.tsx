"use client";
import RegisterForm from "@/components/event/register/RegisterForm";
import React, { useEffect, useState } from "react";
import RegisterFormToggleBtn from "@/components/event/register/RegisterFormToggleBtn";
import { auth } from "../../config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import SwitchTab from "@/components/event/SwitchTab";
import GoogleLoginBtn from "@/components/utils/GoogleLoginBtn";
import HeadingTwo from "@/components/utils/HeadingTwo";
import { useAuth } from "@/context/AuthContext";

const EventPage = () => {
  const [user] = useAuthState(auth);
  const [registerOpen, setRegisterOpen] = useState(false);
  const { fetchLoginUser } = useAuth();

  useEffect(() => {
    fetchLoginUser(auth.currentUser);
  }, []);
  if (!user) return <GoogleLoginBtn />;

  return (
    <div className="mb-32">
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

export default EventPage;
