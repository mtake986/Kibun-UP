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
  addDoc,
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
  handleEditMode: () => void;
  editModeOn: boolean;
  handleSave: (id: string, values: IQuoteInputValues) => void;
  handleCancelUpdate: () => void;
  handleDelete: (id: string) => void;

  getRandomQuote: (setLoading: (boo: boolean) => void) => void;
  randomQuote: IQuote | undefined;

  lockThisQuote: (uid: string, data: IQuote) => void;
  lockedQuote: IQuote | undefined;

  removeLockThisQuote: (uid: string) => void;
  getLockedQuote: (uid?: string) => void;

  isUpdateMode: boolean;
  toggleUpdateMode: (boo: boolean) => void;
  handleUpdate: (qid: string, values: IQuoteInputValues, uid?: string) => void;

  quotesNotMine: IQuote[];
  getQuotesNotMine: () => void;

  registerQuote: (values: IQuoteInputValues, uid?: string) => void;
};

const QuoteContext = createContext({} as QuoteContext);

export function useQuote() {
  return useContext(QuoteContext);
}

export function QuoteProvider({ children }: QuoteProviderProps) {
  const [allQuotes, setAllQuotes] = useState<IQuote[]>([]);
  const [loginUsersQuotes, setLoginUsersQuotes] = useState<IQuote[]>([]);
  const [randomQuote, setRandomQuote] = useState<IQuote>();
  const [lockedQuote, setLockedQuote] = useState<IQuote>();
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
  const [quotesNotMine, setQuotesNotMine] = useState<IQuote[]>([]);

  const quotesCollectionRef = collection(db, "quotes");

  const registerQuote = async (values: IQuoteInputValues, uid?: string) => {
    await addDoc(quotesCollectionRef, {
      ...values,
      uid,
      createdAt: serverTimestamp(),
    }).then(() => {
      toast({
        className: "border-none bg-green-500 text-white",
        title: "Successfully Created",
        description: `
            Person: ${values.person}, 
            Quote: ${values.quote}, 
            Draft: ${values.isDraft},
          `,
      });
    });
  }

  const getAllQuotes = async () => {
    const snapshot = await getDocs(quotesCollectionRef);
    const results = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setAllQuotes(results as IQuote[]);
  };

  const getQuotesNotMine = async () => {
    const q = query(quotesCollectionRef, where("uid", "!=", user?.uid));
    onSnapshot(q, (snapshot) => {
      setQuotesNotMine(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as IQuote))
      );
    });
  };

  const [user] = useAuthState(auth);

  const getLoginUsersQuotes = async () => {
    if (user?.uid) {
      const q = query(quotesCollectionRef, where("uid", "==", user?.uid));
      onSnapshot(q, (snapshot) => {
        setLoginUsersQuotes(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as IQuote))
        );
      });
    }
  };

  const getRandomQuote = async (setLoading: (boo: boolean) => void) => {
    setLoading(true);
    console.log("getRandomQuote started");
    // auth.onAuthStateChanged((user) => {
    if (user) {
      const q = query(
        quotesCollectionRef,
        where("uid", "==", user?.uid),
        where("isDraft", "==", false)
      );
      onSnapshot(q, (snapshot) => {
        const randomNum = getRandomNum(snapshot.docs.length);
        const doc = snapshot.docs[randomNum];
        if (doc) setRandomQuote({ ...doc.data(), id: doc.id } as IQuote);
      });
    }
    // });
    setLoading(false);
  };

  const handleEditMode = () => {
    setEditModeOn(true);
  };

  const [editModeOn, setEditModeOn] = useState(false);

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

  const handleCancelUpdate = () => {
    setIsUpdateMode(false);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "quotes", id));
  };

  const lockThisQuote = async (uid: string, data: IQuote) => {
    await setDoc(doc(db, "lockedQuotes", uid), data);
    setLockedQuote(data);
    // toast({
    //   className: "border-none bg-red-50 text-red-500",
    //   title: "Quote locked",
    // });
  };

  const removeLockThisQuote = async (uid: string) => {
    await deleteDoc(doc(db, "lockedQuotes", uid));
    setLockedQuote(undefined);
    // toast({
    //   className: "border-none bg-red-50 text-red-500",
    //   title: "Quote Unlocked",
    // });
  };

  const getLockedQuote = async (uid?: string) => {
    if (uid) {
      const docRef = doc(db, "lockedQuotes", uid);
      const docSnap = await getDoc(docRef);
      setLockedQuote(docSnap.data() as IQuote);
      console.log(docSnap.data());
    }
  };

  const handleUpdate = async (
    qid: string,
    values: IQuoteInputValues,
    uid?: string
  ) => {
    const docRef = doc(db, "quotes", qid);
    await updateDoc(docRef, {
      ...values,
      updatedAt: serverTimestamp(),
    }).then((res) => {
      if (lockedQuote?.id === qid && values.isDraft) {
        if (uid) removeLockThisQuote(uid);
        toast({
          className: "border-none bg-green-500 text-white",
          title: "Successfully Updated",
          description: `
            Quote: ${values.quote}, 
            Person: ${values.person},
            Draft: ${values.isDraft},
            No Locked Quote.
          `,
        });
      } else {
        toast({
          className: "border-none bg-green-500 text-white",
          title: "Successfully Updated",
          description: `
            Quote: ${values.quote}, 
            Person: ${values.person},
            Draft: ${values.isDraft},
          `,
        });
      }
    });
  };

  const toggleUpdateMode = (boo: boolean) => {
    setIsUpdateMode(boo);
  };

  return (
    <QuoteContext.Provider
      value={{
        allQuotes,
        getAllQuotes,
        loginUsersQuotes,
        getLoginUsersQuotes,
        handleEditMode,
        editModeOn,
        handleSave,
        handleCancelUpdate,
        handleDelete,
        getRandomQuote,
        randomQuote,
        lockThisQuote,
        lockedQuote,
        removeLockThisQuote,
        getLockedQuote,
        isUpdateMode,
        toggleUpdateMode,
        handleUpdate,
        quotesNotMine,
        getQuotesNotMine,
        registerQuote,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}
