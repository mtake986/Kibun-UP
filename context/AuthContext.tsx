"use client";

import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { ReactNode, createContext, useContext, useState } from "react";
import { auth, db, provider, storage } from "../config/Firebase";
import { useRouter } from "next/navigation";
import { useSignOut } from "react-firebase-hooks/auth";
import { toast } from "@/components/ui/use-toast";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ILoginUser } from "@/types/type";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextType = {
  signInWithGoogle: () => void;
  handleLogout: () => void;
  uploadImage: (
    file: File | null,
    newUsername: string,
    newPaginationNum: number | null,
    currentUser: User,
    setLoading: (boo: boolean) => void,
    setIsEditMode: (boo: boolean) => void
  ) => void;
  loginUser: ILoginUser | undefined;
  updateDisplayWhichQuoteType: (text: string) => void;
  fetchLoginUser: (user: any) => void;
  isFetchingUser: boolean;
};

const AuthContext = createContext({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [signOut, loading, error] = useSignOut(auth);

  const [loginUser, setLoginUser] = useState<ILoginUser>();

  const usersCollectionRef = collection(db, "users");

  const [isFetchingUser, setIsFetchingUser] = useState<boolean>(false);
  function signInWithGoogle() {
    signInWithPopup(auth, provider).then(async () => {
      if (auth.currentUser) {
        const user = auth.currentUser;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          // docSnap.data() will be undefined in this case
          console.log("No such document CREATE USER");
          createUserInFirestore(auth.currentUser);
        }
      }
      fetchLoginUser(auth.currentUser);
      toast({
        className: "border-none bg-green-500 text-white",
        title: "Success: Log In",
      });
      router.push("/");
    });
  }

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
        paginationNum: 10,
      }));
  };

  const fetchLoginUser = async (user: User | null) => {
    if (user) {
      const docRef = doc(db, "users", user?.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLoginUser(docSnap.data() as ILoginUser);
      }
    }
  };

  const handleLogout = async () => {
    const success = await signOut();

    if (success) {
      setLoginUser(undefined);
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
    newPaginationNum: number | null,
    currentUser: User,
    setLoading: (boo: boolean) => void,
    setIsEditMode: (boo: boolean) => void
  ) => {
    setLoading(true);

    interface IPayload {
      photoURL?: string | null;
      displayName?: string | null;
      paginationNum?: number;
    }

    let payload: IPayload = {
      photoURL: loginUser?.photoURL,
      displayName: loginUser?.displayName,
      paginationNum: loginUser?.paginationNum,
    };

    if (file) {
      const fileRef = ref(storage, `images/${currentUser.uid}/${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);
      const photoURL = await getDownloadURL(fileRef);
      payload.photoURL = photoURL;
    }
    if (newUsername) {
      payload.displayName = newUsername;
    }
    if (newPaginationNum) payload.paginationNum = newPaginationNum;

    if (auth.currentUser) {
      const docRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(docRef, {
        photoURL: payload.photoURL,
        displayName: payload.displayName,
        paginationNum: payload.paginationNum,
      });
    } else {
      console.log("No user is signed in");
    }
    console.log(payload, currentUser);
    updateProfile(currentUser, payload)
      .then(() => {
        // Profile updated!
        // ...
        alert("Successfully Updated");
        fetchLoginUser(auth.currentUser).then(() => {
          setLoading(false);
          setIsEditMode(false);
        });
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
        signInWithGoogle,
        handleLogout,
        uploadImage,
        loginUser,
        updateDisplayWhichQuoteType,
        fetchLoginUser,
        isFetchingUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
