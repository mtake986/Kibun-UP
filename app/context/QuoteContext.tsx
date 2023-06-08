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
} from "firebase/firestore";
type QuoteProviderProps = {
  children: ReactNode;
};
import { IQuote, IQuoteInputValues } from "@/types/type";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "@/components/ui/use-toast";

type QuoteContext = {
  allQuotes: IQuote[] | [];
  getAllQuotes: () => void;
  loginUsersQuotes: IQuote[] | [];
  getLoginUsersQuotes: () => void;
  getTodaysQuote: () => void;
  todaysQuotes: IQuote[] | [];
  handleEditMode: () => void;
  editModeOn: boolean;
  handleSave: (id: string, values: IQuoteInputValues) => void;
  handleCancelEdit: () => void;
  handleDelete: (id: string) => void;
};

const QuoteContext = createContext({} as QuoteContext);

export function useQuote() {
  return useContext(QuoteContext);
}

export function QuoteProvider({ children }: QuoteProviderProps) {
  const [allQuotes, setAllQuotes] = useState<IQuote[]>([]);
  const [loginUsersQuotes, setLoginUsersQuotes] = useState<IQuote[]>([]);
  const [todaysQuotes, setTodaysQuotes] = useState<IQuote[]>([]);

  const getAllQuotes = async () => {
    const collectionRef = collection(db, "quotes");
    const snapshot = await getDocs(collectionRef);
    const results = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setAllQuotes(results as IQuote[]);
    console.log(results, allQuotes);
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

  const getTodaysQuote = async () => {
    const collectionRef = collection(db, "quotes");
    // auth.onAuthStateChanged((user) => {
    if (user) {
      const q = query(
        collectionRef,
        where("uid", "==", user?.uid),
        where("isDraft", "==", false)
      );
      onSnapshot(q, (snapshot) => {
        setTodaysQuotes(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as IQuote))
        );
      });
    }
    // });
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
  
  return (
    <QuoteContext.Provider
      value={{
        allQuotes,
        getAllQuotes,
        loginUsersQuotes,
        getLoginUsersQuotes,
        getTodaysQuote,
        todaysQuotes,
        handleEditMode,
        editModeOn,
        handleSave,
        handleCancelEdit,
        handleDelete,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}
