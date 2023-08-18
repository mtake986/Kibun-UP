"use client";

import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { ReactNode, createContext, useContext, useState } from "react";
import { auth, provider } from "../../config/Firebase";
import { useRouter } from "next/navigation";
import { useSignOut } from "react-firebase-hooks/auth";
import { toast } from "@/components/ui/use-toast";

type AuthProviderProps = {
  children: ReactNode;
};

type loginUserInfoType = {
  email: string;
  name: string;
  photoUrl: string;
};

type AuthContext = {
  loginUserInfo: loginUserInfoType | {};
  setLoginUserInfo: (loginUserInfo: any) => void;
  signInWithGoogle: () => void;
  handleLogout: () => void;
  updateCurrentUser: () => void;
};

const AuthContext = createContext({} as AuthContext);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [loginUserInfo, setLoginUserInfo] = useState({});
  const router = useRouter();
  const [signOut, loading, error] = useSignOut(auth);

  function signInWithGoogle() {
    signInWithPopup(auth, provider).then(() => {
      toast({
        className: "border-none bg-green-500 text-white",
        title: "Success: Log In",
      });
      router.push("/");
    });
  }
  const handleLogout = async () => {
    const success = await signOut();
    if (success) {
      toast({
        className: "border-none bg-blue-500 text-white",
        title: "Success: Log Out",
      });
      router.push("/");
    }
  };
  const updateCurrentUser = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  };

  return (
    <AuthContext.Provider
      value={{
        loginUserInfo,
        setLoginUserInfo,
        signInWithGoogle,
        handleLogout,
        updateCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
