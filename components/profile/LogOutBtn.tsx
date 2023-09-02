import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const LogOutBtn = () => {
  const { handleLogout } = useAuth();

  return (
    <div
      className="flex cursor-pointer items-center gap-1 px-3 py-1 text-red-500 duration-300 hover:opacity-50"
      onClick={() => handleLogout()}
    >
      <LogOut size={16} className="mr-2" />
      Logout
    </div>
  );
};

export default LogOutBtn;
