import React from "react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const LogOutBtn = () => {
  const { handleLogout } = useAuth();

  return (
    <Button
      className="dark:bg-slate-900 flex cursor-pointer gap-5 items-center bg-red-50 p-1 text-red-500 duration-300 hover:bg-red-50 hover:opacity-70"
      onClick={() => handleLogout()}
    >
      <LogOut size={16} />
      Logout
    </Button>
  );
};

export default LogOutBtn;
