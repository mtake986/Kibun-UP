import { useAuth } from "@/context/AuthContext";
import { displayErrorToast } from "@/functions/displayToast";
import { LogOut } from "lucide-react";
import React from "react";

const LogOutBtn = () => {
  const { handleLogout } = useAuth();

  return (
    <button
      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-red-500 duration-300 ease-in hover:opacity-70 dark:text-red-500"
      onClick={async () => {
        try {
          await handleLogout();
        } catch (error) {
          displayErrorToast(error);
        }
      }}
    >
      <LogOut size={14} />
      <span>Logout</span>
    </button>
  );
};

export default LogOutBtn;
