"use client";

import { User, signInWithPopup, updateProfile } from "firebase/auth";
import { ReactNode, createContext, useContext, useState } from "react";
import { auth, db, provider, storage } from "../config/Firebase";
import { useRouter } from "next/navigation";
import { useSignOut } from "react-firebase-hooks/auth";
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
import {
  TypeLoginUser,
  TypeUpdateUserInputs,
  TypeQuotesPerPage,
} from "@/types/type";
import {
  displayErrorToast,
  displaySuccessToast,
  displayToast,
} from "@/functions/displayToast";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextType = {
  signInWithGoogle: () => void;
  handleLogout: () => void;
  uploadImage: (
    file: File | null,
    newUsername: string,
    newItemsPerPage: number | null,
    currentUser: User,
    setLoading: (boo: boolean) => void,
    setIsEditMode: (boo: boolean) => void
  ) => void;
  loginUser: TypeLoginUser | undefined;
  updateQuoteTypeForHome: (text: string) => void;
  fetchLoginUser: (user: any) => void;
  updateTagForQuotableApi: (text: string) => void;
  updateQuotesPerPage: (quotesPerPage: TypeQuotesPerPage) => void;
};

const AuthContext = createContext({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [signOut, loading, error] = useSignOut(auth);

  const [loginUser, setLoginUser] = useState<TypeLoginUser>();

  function signInWithGoogle() {
    signInWithPopup(auth, provider).then(async () => {
      if (auth.currentUser) {
        const user = auth.currentUser;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          // docSnap.data() will be undefined in this case
          createUserInFirestore(auth.currentUser);
        }
      }
      fetchLoginUser(auth.currentUser);
      displaySuccessToast({
        text: "Logged in",
      });
      router.push("/home");
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
        updatedAt: serverTimestamp(),
        settings: {
          itemsPerPage: 10,
          quoteTypeForHome: "appChoice",
          tagForQuotableApi: "random",
        },
      }));
  };

  const fetchLoginUser = async (user: User | null) => {
    if (user) {
      console.log(user);
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      onSnapshot(q, (snapshot) => {
        setLoginUser(snapshot.docs[0]?.data() as TypeLoginUser);
      });
    }
  };

  const handleLogout = async () => {
    const success = await signOut();

    if (success) {
      setLoginUser(undefined);
      displayToast({
        text: "Logged Out",
        color: "blue",
      });
      router.push("/");
    }
  };

  const uploadImage = async (
    file: File | null,
    newUsername: string,
    newItemsPerPage: number | null,
    currentUser: User,
    setLoading: (boo: boolean) => void,
    setIsEditMode: (boo: boolean) => void
  ) => {
    setLoading(true);

    let payload: TypeUpdateUserInputs = {
      photoURL: loginUser?.photoURL,
      displayName: "",
      itemsPerPage: 10,
    };

    if (file) {
      const fileRef = ref(storage, `images/${currentUser.uid}/${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);
      const photoURL = await getDownloadURL(fileRef);
      payload.photoURL = photoURL;
    }
    if (newUsername) {
      payload.displayName = newUsername || loginUser?.displayName;
    }

    if (newItemsPerPage) {
      payload.itemsPerPage =
        newItemsPerPage || loginUser?.settings.itemsPerPage;
    }

    if (auth.currentUser) {
      const docRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(docRef, {
        photoURL: payload.photoURL,
        displayName: payload.displayName,
        "settings.itemsPerPage": payload.itemsPerPage,
      });
    } else {
      displayErrorToast("No user is signed in");
    }
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

  const updateQuoteTypeForHome = async (text: string) => {
    if (auth.currentUser) {
      const docRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(docRef, {
        "settings.quoteTypeForHome": text,
      });
    }
  };

  const updateTagForQuotableApi = async (text: string) => {
    if (auth.currentUser) {
      const docRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(docRef, {
        "settings.tagForQuotableApi": text,
      });
    }
  };

  const updateQuotesPerPage = async (quotesPerPage: TypeQuotesPerPage) => {
    if (loginUser) {
      const docRef = doc(db, "users", loginUser.uid);
      await updateDoc(docRef, {
        "settings.apiQuotesPerPage": quotesPerPage,
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
        updateQuoteTypeForHome,
        fetchLoginUser,
        updateTagForQuotableApi,
        updateQuotesPerPage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
