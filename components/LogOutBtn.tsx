import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/app/config/Firebase";
import { LogOut } from "lucide-react";

const LogOutBtn = () => {
  const router = useRouter();

  const handleLogout = () => {
    signOut(auth);
    router.push("/");
  };

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
