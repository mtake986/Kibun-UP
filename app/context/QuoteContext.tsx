"use client";
import { ReactNode, createContext, useContext, useState } from "react";
import { db, auth } from "../config/Firebase";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  setDoc,
  getDoc,
} from "firebase/firestore";
type QuoteProviderProps = {
  children: ReactNode;
};
import { IQuote, IQuoteInputValues } from "@/types/type";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "@/components/ui/use-toast";
import { getRandomNum } from "../../utils/functions";

type QuoteContext = {
  allQuotes: IQuote[] | [];
  getAllQuotes: () => void;
  loginUsersQuotes: IQuote[] | [];
  getLoginUsersQuotes: () => void;
  getPrimaryQuote: () => void;
  primaryQuotes: IQuote[] | [];
  handleEditMode: () => void;
  editModeOn: boolean;
  handleSave: (id: string, values: IQuoteInputValues) => void;
  handleCancelEdit: () => void;
  handleDelete: (id: string) => void;

  getRandomQuote: (setLoading: (boo: boolean) => void) => void;
  randomQuote: IQuote | undefined;

  lockThisQuote: (uid: string, data: IQuote) => void;
  lockedQuote: IQuote | undefined;

  removeLockThisQuote: (uid: string) => void;
  getLockedQuote: (uid?: string) => void;
};

const QuoteContext = createContext({} as QuoteContext);

export function useQuote() {
  return useContext(QuoteContext);
}

export function QuoteProvider({ children }: QuoteProviderProps) {
  const [allQuotes, setAllQuotes] = useState<IQuote[]>([]);
  const [loginUsersQuotes, setLoginUsersQuotes] = useState<IQuote[]>([]);
  const [primaryQuotes, setPrimaryQuotes] = useState<IQuote[]>([]);
  const [randomQuote, setRandomQuote] = useState<IQuote>();
  const [lockedQuote, setLockedQuote] = useState<IQuote>();

  const getAllQuotes = async () => {
    const collectionRef = collection(db, "quotes");
    const snapshot = await getDocs(collectionRef);
    const results = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setAllQuotes(results as IQuote[]);
  };

  const [user] = useAuthState(auth);

  const getLoginUsersQuotes = async () => {
    const collectionRef = collection(db, "quotes");
    if (user?.uid) {
      const q = query(collectionRef, where("uid", "==", user?.uid));
      onSnapshot(q, (snapshot) => {
        setLoginUsersQuotes(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as IQuote))
        );
      });
    }
  };

  const getPrimaryQuote = async () => {
    const collectionRef = collection(db, "quotes");
    // auth.onAuthStateChanged((user) => {
    if (user) {
      const q = query(
        collectionRef,
        where("uid", "==", user?.uid),
        where("isDraft", "==", false)
      );
      onSnapshot(q, (snapshot) => {
        setPrimaryQuotes(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as IQuote))
        );
      });
    }
    // });
  };

  const getRandomQuote = async (setLoading: (boo: boolean) => void) => {
    setLoading(true);
    console.log('getRandomQuote started')
    const collectionRef = collection(db, "quotes");
    // auth.onAuthStateChanged((user) => {
    if (user) {
      const q = query(
        collectionRef,
        where("uid", "==", user?.uid),
        where("isDraft", "==", false)
      );
      onSnapshot(q, (snapshot) => {
        const randomNum = getRandomNum(snapshot.docs.length);
        const doc = snapshot.docs[randomNum];
        setRandomQuote({ ...doc.data(), id: doc.id } as IQuote);
      });
    }
    // });
    setLoading(false);
  };

  const handleEditMode = () => {
    setEditModeOn(true);
  };

  const [editModeOn, setEditModeOn] = useState(false);
  const [person, setPerson] = useState<string>("");

  const handleSave = async (id: string, values: IQuoteInputValues) => {
    const docRef = doc(db, "quotes", id);
    await updateDoc(docRef, {
      ...values,
      updatedAt: serverTimestamp(),
    }).then((res) => {
      toast({
        className: "border-none bg-green-500 text-white",
        title: "Successfully Updated",
        description: `
            Quote: ${values.quote}, 
            Person: ${values.person},
            Draft: ${values.isDraft},
          `,
      });
      setEditModeOn(false);
    });
  };

  const handleCancelEdit = () => {
    setEditModeOn(false);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "quotes", id));
  };

  const lockThisQuote = async (uid: string, data: IQuote) => {
    await setDoc(doc(db, "lockedQuotes", uid), data);
    setLockedQuote(data);
  };

  const removeLockThisQuote = async (uid: string) => {
    await deleteDoc(doc(db, "lockedQuotes", uid));
    setLockedQuote(undefined);
  };

  const getLockedQuote = async (uid?: string) => {
    if (uid) {
      const docRef = doc(db, "lockedQuotes", uid);
      const docSnap = await getDoc(docRef);
      setLockedQuote(docSnap.data() as IQuote);
      console.log(docSnap.data());
    }
  };

  return (
    <QuoteContext.Provider
      value={{
        allQuotes,
        getAllQuotes,
        loginUsersQuotes,
        getLoginUsersQuotes,
        getPrimaryQuote,
        primaryQuotes,
        handleEditMode,
        editModeOn,
        handleSave,
        handleCancelEdit,
        handleDelete,
        getRandomQuote,
        randomQuote,
        lockThisQuote,
        lockedQuote,
        removeLockThisQuote,
        getLockedQuote,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}
