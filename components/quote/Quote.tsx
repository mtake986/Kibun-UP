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
import { Filter } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuote } from "@/context/QuoteContext";
import SortFilterMine from "./Mine/Sort/SortFilterMine";
import SortFilterNotMine from "./NotMine/Sort/SortFilterNotMine";
import ModalOpenBtn from "./ModalOpenBtn";

const Quote = () => {
  const [user] = useAuthState(auth);
  const [registerOpen, setRegisterOpen] = useState(false);
  const { loginUser, fetchLoginUser } = useAuth();

  const { whichList } = useQuote();

  useEffect(() => {
    fetchLoginUser(user);
  }, [user]);
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
        <HeadingTwo text="Quotes" />
        {/* <span className="absolute top-0 right-0 text-xs text-gray-400">
          {user?.displayName}
        </span> */}

        {whichList === "yours" || whichList === "all" ? <ModalOpenBtn /> : null}

        <SelectTab />
      </div>
    </div>
  );
};

export default Quote;
