"use client";
import List from "@/components/event/list/Mine/UserEventList";
import RegisterForm from "@/components/event/register/RegisterForm";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import RegisterFormToggleBtn from "@/components/event/register/RegisterFormToggleBtn";
import { auth } from "../config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEvent } from "../context/EventContext";
import SwitchTab from "@/components/event/list/SwitchTab";

const EventPage = () => {
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

      <div className="relative mt-12">
        <h2 className="mb-2 mt-4 text-center text-3xl font-bold">Events</h2>
        <SwitchTab />
      </div>
    </div>
  );
};

export default EventPage;
