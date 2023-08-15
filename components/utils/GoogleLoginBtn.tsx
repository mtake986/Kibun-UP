import React from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/app/config/Firebase";

const GoogleLoginBtn = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <div className="rounded-lg pt-12 text-center">
      <button
        onClick={() => {
          signInWithGoogle();
        }}
        className="mx-auto flex gap-2 rounded-lg border border-slate-200 px-4 py-2 text-slate-700 transition duration-150 hover:border-slate-400 hover:text-slate-900 hover:shadow"
      >
        <Image
          className="h-6 w-6"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          loading="lazy"
          alt="google logo"
          width={24}
          height={24}
        />
        <span>Login with Google</span>
      </button>
    </div>
  );
};

export default GoogleLoginBtn;
