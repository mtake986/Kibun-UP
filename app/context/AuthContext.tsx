'use client';

import { ReactNode, createContext, useContext, useState } from "react";


type AuthProviderProps = {
  children: ReactNode
};
type AuthContext = {
  loginEmail: string;
  setLoginEmail: (text: string) => void
};

const AuthContext = createContext({} as AuthContext);

export function useAuth() {
  return useContext(AuthContext);
}


export function AuthProvider({ children }: AuthProviderProps) {
  const [loginEmail, setLoginEmail] = useState('');

  return (
    <AuthContext.Provider value={{ loginEmail, setLoginEmail }}>
      {children}
    </AuthContext.Provider>
  );
}
