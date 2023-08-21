"use client";

import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { ReactNode, createContext, useContext, useState } from "react";
import { auth, db, provider, storage } from "../app/config/Firebase";
import { useRouter } from "next/navigation";
import { useSignOut } from "react-firebase-hooks/auth";
import { toast } from "@/components/ui/use-toast";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ILoginUser } from "@/types/type";

type AuthProviderProps = {
  children: ReactNode;
};

type loginUserInfoType = {
  email: string;
  name: string;
  photoUrl: string;
};

type AuthContextType = {
  loginUserInfo: loginUserInfoType | {};
  setLoginUserInfo: (loginUserInfo: any) => void;
  signInWithGoogle: () => void;
  handleLogout: () => void;
  uploadImage: (
    file: File | null,
    newUsername: string,
    currentUser: User,
    setLoading: (boo: boolean) => void,
    setIsEditMode: (boo: boolean) => void
  ) => void;
  loginUser: ILoginUser | undefined;
  updateDisplayWhichQuoteType: (text: string) => void;
  fetchLoginUser: () => void;
};

const AuthContext = createContext({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [loginUserInfo, setLoginUserInfo] = useState({});
  const router = useRouter();
  const [signOut, loading, error] = useSignOut(auth);

  const [loginUser, setLoginUser] = useState<ILoginUser>();

  const usersCollectionRef = collection(db, "users");

  function signInWithGoogle() {
    signInWithPopup(auth, provider).then(async () => {
      createUserInFirestore(auth.currentUser);
      fetchLoginUser();
      toast({
        className: "border-none bg-green-500 text-white",
        title: "Success: Log In",
      });
      router.push("/");
    });
  }

  const fetchLoginUser = () => {
    onSnapshot(usersCollectionRef, (snapshot) => {
      setLoginUser(snapshot.docs.map((doc) => doc.data() as ILoginUser)[0]);
    });

  };
  const createUserInFirestore = async (user: any) => {
    const { uid, email, displayName, photoURL } = user;

    user &&
      (await setDoc(doc(db, "users", uid), {
        uid,
        email,
        displayName,
        photoURL,
        createdAt: serverTimestamp(),
        displayWhichQuoteType: "mine",
      }));
  };

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

  const uploadImage = async (
    file: File | null,
    newUsername: string,
    currentUser: User,
    setLoading: (boo: boolean) => void,
    setIsEditMode: (boo: boolean) => void
  ) => {
    setLoading(true);

    interface IPayload {
      photoURL?: string;
      displayName?: string;
    }

    let payload: IPayload = {};
    if (file) {
      const fileRef = ref(storage, `images/${currentUser.uid}/${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);
      const photoURL = await getDownloadURL(fileRef);
      payload.photoURL = photoURL;
    }
    if (newUsername) {
      payload.displayName = newUsername;
    }

    updateProfile(currentUser, payload)
      .then(() => {
        // Profile updated!
        // ...
        alert("Successfully Updated");
        setLoading(false);
        setIsEditMode(false);
      })
      .catch((error) => {
        alert("Something went wrong! Please try later.");
      });

    // const fileRef = ref(storage, `${currentUser.uid}.png`);
  };

  const updateDisplayWhichQuoteType = async (text: string) => {
    if (auth.currentUser) {
      const docRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(docRef, {
        displayWhichQuoteType: text,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loginUserInfo,
        setLoginUserInfo,
        signInWithGoogle,
        handleLogout,
        uploadImage,
        loginUser,
        updateDisplayWhichQuoteType,
        fetchLoginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
