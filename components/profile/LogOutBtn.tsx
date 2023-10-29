import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";
import React from "react";

const LogOutBtn = () => {
  const { handleLogout } = useAuth();

  return (
    <button
      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-red-500 hover:opacity-70 duration-300 ease-in dark:text-red-500"
      onClick={() => handleLogout()}
    >
      <LogOut size={14} />
      <span>Logout</span>
    </button>
  );
};

export default LogOutBtn;
