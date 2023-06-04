"use client";
import List from "@/components/event/list/List";
import RegisterForm from "@/components/event/register/RegisterForm";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import RegisterFormToggleBtn from "@/components/event/register/RegisterFormToggleBtn";

const EventPage = () => {
  const [registerOpen, setRegisterOpen] = useState(false);
  return (
    <div>
      {registerOpen ? (
        <RegisterForm
          registerOpen={registerOpen}
          setRegisterOpen={setRegisterOpen}
        />
      ) : (
        <RegisterFormToggleBtn
          registerOpen={registerOpen}
          setRegisterOpen={setRegisterOpen}
        />
      )}
      <List />
    </div>
  );
};

export default EventPage;
