import React from "react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const LogOutBtn = () => {
  const { handleLogout } = useAuth();

  return (
    <Button
      className="flex cursor-pointer items-center gap-3 bg-red-50 p-1 text-red-500 duration-300 hover:bg-red-50 hover:opacity-70 dark:bg-slate-900"
      onClick={() => handleLogout()}
    >
      <LogOut size={14} />
      Logout
    </Button>
  );
};

export default LogOutBtn;
