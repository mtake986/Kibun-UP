import { useAuth } from "@/context/AuthContext";
import { displayErrorToast } from "@/functions/displayToast";
import React from "react";

const LogOutBtn = () => {
  const { handleLogout } = useAuth();

  return (
    <div
      className="hover:opacity-70 cursor-pointer grow gap-2 bg-slate-50 px-3 py-1 text-sm dark:bg-slate-900"
      onClick={async () => {
        try {
          await handleLogout();
        } catch (error) {
          displayErrorToast(error);
        }
      }}
    >
      <span className="text-xs text-red-500">Log out</span>
    </div>
  );
};

export default LogOutBtn;
