import React from "react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

const LogOutBtn = () => {

  const { handleLogout } = useAuth();


  return (
    <Button
      className="flex cursor-pointer items-center gap-1 bg-red-500 p-1 duration-300 hover:bg-red-500/90"
      onClick={() => handleLogout()}
    >
      <LogOut size={16} className="mr-2" />
      Logout
    </Button>
  );
};

export default LogOutBtn;
