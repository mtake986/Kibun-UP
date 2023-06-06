"use client";

import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { ReactNode, createContext, useContext, useState } from "react";
import { auth, provider } from "../config/Firebase";

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
};

const AuthContext = createContext({} as AuthContext);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [loginUserInfo, setLoginUserInfo] = useState({});

  function signInWithGoogle() {
    signInWithPopup(auth, provider)
      // .then((result) => {
      //   const name = result.user.displayName;
      //   const email = result.user.email;
      //   const photoUrl = result.user.photoURL;
      //   setLoginUserInfo({ email, name, photoUrl });
      // })
      // .catch((error) => console.log(error));
  }
  return (
    <AuthContext.Provider
      value={{ loginUserInfo, setLoginUserInfo, signInWithGoogle }}
    >
      {children}
    </AuthContext.Provider>
  );
}
