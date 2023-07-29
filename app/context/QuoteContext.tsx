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
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
type QuoteProviderProps = {
  children: ReactNode;
};
import { IQuote, IQuoteInputValues, IFavQuote } from "@/types/type";
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

  registerQuote: (
    values: IQuoteInputValues,
    uid?: string,
    displayName?: string | null
  ) => void;
  storeFavQuote: (uid: string, qid: string) => void;
  removeFavQuote: (uid: string, qid: string) => void;
  fetchFavQuotes: () => void;
  favQuotes: IFavQuote[];
  isFav: (uid: string, qid: string) => boolean;
};

const QuoteContext = createContext({} as QuoteContext);

export function useQuote() {
  return useContext(QuoteContext);
}

export function QuoteProvider({ children }: QuoteProviderProps) {
  const [allQuotes, setAllQuotes] = useState<IQuote[]>([]);
  const [favQuotes, setFavQuotes] = useState<IFavQuote[]>([]);
  const [loginUsersQuotes, setLoginUsersQuotes] = useState<IQuote[]>([]);
  const [randomQuote, setRandomQuote] = useState<IQuote>();
  const [lockedQuote, setLockedQuote] = useState<IQuote>();
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
  const [quotesNotMine, setQuotesNotMine] = useState<IQuote[]>([]);

  const quotesCollectionRef = collection(db, "quotes");
  const favQuotesCollectionRef = collection(db, "favQuotes");
  // todo: store user icon
  // todo: optional to update user icon
  // todo: create users in firestore

  const registerQuote = async (
    values: IQuoteInputValues,
    uid?: string,
    displayName?: string | null
  ) => {
    await addDoc(quotesCollectionRef, {
      ...values,
      uid,
      displayName,
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
  };

  const getAllQuotes = async () => {
    const snapshot = await getDocs(quotesCollectionRef);
    const results = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setAllQuotes(results as IQuote[]);
  };

  const getQuotesNotMine = async () => {
    const q = user
      ? query(quotesCollectionRef, where("uid", "!=", user.uid))
      : quotesCollectionRef;
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
      if (docSnap.exists()) {
        setLockedQuote(docSnap.data() as IQuote);
      }
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

  const storeFavQuote = async (uid: string, qid: string) => {
    console.log(uid);
    const docRef = doc(db, "favQuotes", qid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        uids: arrayUnion(uid),
      });
    } else {
      await setDoc(doc(db, "favQuotes", qid), { qid, uids: [uid] });
    }
  };

  const removeFavQuote = async (uid: string, qid: string) => {
    const docRef = doc(db, "favQuotes", qid);
    await updateDoc(docRef, {
      uids: arrayRemove(uid),
    });
  };

  const fetchFavQuotes = async () => {
    // const q = query(favQuotesCollectionRef, where("uids", "array-contains", user?.uid));
    // onSnapshot(q, (snapshot) => {
    //   setFavQuotes(
    //     snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as IFavQuote))
    //   );
    // });
    onSnapshot(favQuotesCollectionRef, (snapshot) => {
      setFavQuotes(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as IFavQuote))
      );
    });
  };

  const isFav = async (uid: string, qid: string): boolean => {
    console.log(uid, qid, favQuotes);
    const docRef = doc(db, "favQuotes", qid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data() as IFavQuote;
      console.log(data)
      return data.uids.includes(uid);
    }
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
        storeFavQuote,
        removeFavQuote,
        fetchFavQuotes,
        favQuotes,
        isFav,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}
