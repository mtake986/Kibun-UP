'use client';
import React, { useEffect, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import SwitchTab from "./SwitchTab";
import GoogleLoginBtn from "@/components/utils/GoogleLoginBtn";
import HeadingTwo from "@/components/utils/HeadingTwo";
import { auth } from "@/config/Firebase";
import RegisterFormToggleBtn from "./RegisterFormToggleBtn";
import { useEvent } from "@/context/EventContext";

export const metadata = {
  title: "Event",
};

const Event = () => {
  const [user] = useAuthState(auth);
  const {isRegisterFormOpen} = useEvent();

  if (!user) return <GoogleLoginBtn />;

  return (
    <div className="px-5 py-10 sm:mb-32 sm:p-0">
      <div className="relative">
        <HeadingTwo text="Events" />
        {user && (!isRegisterFormOpen ? <RegisterFormToggleBtn /> : null)}

        <SwitchTab />
      </div>
    </div>
  );
};

export default Event;
