import React from "react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { displayErrorToast } from "@/functions/displayToast";

const LogOutBtn = () => {
  const { handleLogout } = useAuth();

  return (
    <button
      className="flex cursor-pointer items-center justify-center gap-3 bg-red-50 py-1 px-3 text-sm text-red-500 transition duration-300 ease-in hover:bg-red-50 hover:opacity-70 dark:bg-slate-900"
      onClick={async () => {
        try {
          await handleLogout();
        } catch (error) {
          displayErrorToast(error);
        }
      }}
    >
      <LogOut size={14} />
      Logout
    </button>
  );
};

export default LogOutBtn;
