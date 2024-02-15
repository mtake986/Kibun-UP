import React from "react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { displayErrorToast } from "@/functions/displayToast";
import { auth } from "@/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const LogOutBtn = () => {
  const [user] = useAuthState(auth);
  const { handleLogout } = useAuth();

  if (!user) return null;
  
  return (
    <button
      className="flex cursor-pointer items-center justify-center gap-3 py-1 px-3 transition duration-200 ease-in hover:opacity-70"
      onClick={async () => {
        try {
          await handleLogout();
        } catch (error) {
          displayErrorToast(error);
        }
      }}
    >
      <LogOut size={16} />
    </button>
  );
};

export default LogOutBtn;
