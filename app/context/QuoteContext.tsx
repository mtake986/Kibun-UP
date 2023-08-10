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
  orderBy,
} from "firebase/firestore";
type QuoteProviderProps = {
  children: ReactNode;
};
import { IQuote, IQuoteInputValues, IFavQuote, IUserInfo } from "@/types/type";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "@/components/ui/use-toast";
import { getRandomNum } from "../../utils/functions";

type QuoteContext = {
  allQuotes: IQuote[] | [];
  getAllQuotes: () => void;
  loginUserQuotes: IQuote[] | [];
  getLoginUserQuotes: () => void;
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

  registerQuote: (values: IQuoteInputValues, userInfo: IUserInfo) => void;
  storeFavQuote: (uid: string, qid: string) => void;
  removeFavQuote: (uid: string, qid: string) => void;
  fetchFavQuotes: () => void;
  favQuotes: IFavQuote[];
  isFav: (uid: string, qid: string) => void;
  setRandomQuote: (quote: IQuote | undefined) => void;
  setLockedQuote: (quote: IQuote | undefined) => void;

  searchTagForMine: string | undefined;
  setSearchTagForMine: (tag: string | undefined) => void;
  searchTagForNotMine: string | undefined;
  setSearchTagForNotMine: (tag: string | undefined) => void;
  fetchFilteredMyQuotes: () => void;
  fetchFilteredNotMyQuotes: () => void;
  sortByElement: string;
  setSortByElement: (ele: string) => void;
};

const QuoteContext = createContext({} as QuoteContext);

export function useQuote() {
  return useContext(QuoteContext);
}

export function QuoteProvider({ children }: QuoteProviderProps) {
  const [allQuotes, setAllQuotes] = useState<IQuote[]>([]);
  const [favQuotes, setFavQuotes] = useState<IFavQuote[]>([]);
  const [loginUserQuotes, setLoginUserQuotes] = useState<IQuote[]>([]);
  const [randomQuote, setRandomQuote] = useState<IQuote>();
  const [lockedQuote, setLockedQuote] = useState<IQuote>();
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
  const [quotesNotMine, setQuotesNotMine] = useState<IQuote[]>([]);

  const quotesCollectionRef = collection(db, "quotes");
  const favQuotesCollectionRef = collection(db, "favQuotes");
  const [searchTagForMine, setSearchTagForMine] = useState<string>();
  const [searchTagForNotMine, setSearchTagForNotMine] = useState<string>();

  const [sortByElement, setSortByElement] = useState<string>("");

  const [user] = useAuthState(auth);

  const registerQuote = async (
    values: IQuoteInputValues,
    userInfo: IUserInfo
  ) => {
    await addDoc(quotesCollectionRef, {
      ...values,
      userInfo,
      createdAt: serverTimestamp(),
    }).then(() => {
      toast({
        className: "border-none bg-green-500 text-white",
        title: "Successfully Created",
        // description: `
        //     Person: ${values.person},
        //     Quote: ${values.quote},
        //     Draft: ${values.isDraft},
        //     Tags: ${values.tags.map((value, i) => value.tag: )}
        //   `,
      });
    });
  };

  const getAllQuotes = async () => {
    const snapshot = await getDocs(quotesCollectionRef);
    const results = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setAllQuotes(results as IQuote[]);
  };

  const getQuotesNotMine = async () => {
    if (user) {
      const q = query(
        quotesCollectionRef,
        where("userInfo.uid", "!=", user.uid)
      );
      onSnapshot(q, (snapshot) => {
        setQuotesNotMine(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as IQuote))
        );
      });
    }
  };

  const getLoginUserQuotes = async () => {
    if (user?.uid) {
      let q;
      if (sortByElement === "quote") {
        q = query(
          quotesCollectionRef,
          where("userInfo.uid", "==", user?.uid),
          orderBy("quote", "desc")
        );
      } else if (sortByElement === "person") {
        q = query(
          quotesCollectionRef,
          where("userInfo.uid", "==", user?.uid),
          orderBy("person", "desc")
        );
      } else {
        q = query(
          quotesCollectionRef,
          where("userInfo.uid", "==", user?.uid),
          orderBy("createdAt", "desc")
        );
      }

      onSnapshot(q, (snapshot) => {
        setLoginUserQuotes(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as IQuote))
        );
      });
    }
    // if (sortByElement) {
    //   loginUserQuotes.sort((a, b) => {
    //     if (sortByElement === "quote") {
    //       return a.quote > b.quote ? -1 : a.quote < b.quote ? 1 : 0;
    //     } else if (sortByElement === "person") {
    //       return a.person > b.person ? -1 : a.person < b.person ? 1 : 0;
    //     } else if (sortByElement === "createdAt") {
    //       return a.createdAt > b.createdAt
    //         ? -1
    //         : a.createdAt < b.createdAt
    //         ? 1
    //         : 0;
    //     } else return 0;
    //   });
    // }
  };

  const getRandomQuote = async (setLoading: (boo: boolean) => void) => {
    setLoading(true);
    // auth.onAuthStateChanged((user) => {
    if (user) {
      const q = query(
        quotesCollectionRef,
        where("userInfo.uid", "==", user?.uid),
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
          // description: `
          //   Quote: ${values.quote},
          //   Person: ${values.person},
          //   Draft: ${values.isDraft},
          //   Tags: ${values.tags.map((value, i) => value)}
          //   No Locked Quote.
          // `,
        });
      } else {
        toast({
          className: "border-none bg-green-500 text-white",
          title: "Successfully Updated",
          // description: `
          //   Quote: ${values.quote},
          //   Person: ${values.person},
          //   Draft: ${values.isDraft},
          //   Tags: ${values.tags.map((value, i) => value)}
          // `,
        });
      }
    });
  };

  const toggleUpdateMode = (boo: boolean) => {
    setIsUpdateMode(boo);
  };

  const storeFavQuote = async (uid: string, qid: string) => {
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
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    if (data?.uids.length === 1) {
      await deleteDoc(doc(db, "favQuotes", qid));
    } else {
      await updateDoc(docRef, {
        uids: arrayRemove(uid),
      });
    }
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

  const isFav = async (uid: string, qid: string) => {
    const docRef = doc(db, "favQuotes", qid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data() as IFavQuote;
      return data.uids.includes(uid);
    }
  };

  const fetchFilteredMyQuotes = async () => {
    if (searchTagForMine) {
      setLoginUserQuotes(
        loginUserQuotes
          .filter((q) => {
            console.log(q.tags);
            if (q.tags) {
              return q.tags.some((tag) => tag.tag == searchTagForMine);
            }
          })
          .sort((a, b) => {
            if (sortByElement === "quote") {
              return a.quote > b.quote ? -1 : a.quote < b.quote ? 1 : 0;
            } else if (sortByElement === "person") {
              return a.person > b.person ? -1 : a.person < b.person ? 1 : 0;
            } else if (sortByElement === "createdAt") {
              return a.createdAt > b.createdAt
                ? -1
                : a.createdAt < b.createdAt
                ? 1
                : 0;
            } else return 0;
          })
      );
    } else {
      setLoginUserQuotes(
        loginUserQuotes
          .filter((q) => q.tags?.length === 0)
          .sort((a, b) => {
            if (sortByElement === "quote") {
              return a.quote > b.quote ? -1 : a.quote < b.quote ? 1 : 0;
            } else if (sortByElement === "person") {
              return a.person > b.person ? -1 : a.person < b.person ? 1 : 0;
            } else if (sortByElement === "createdAt") {
              return a.createdAt > b.createdAt
                ? -1
                : a.createdAt < b.createdAt
                ? 1
                : 0;
            } else return 0;
          })
      );
    }
  };

  const fetchFilteredNotMyQuotes = async () => {
    if (searchTagForNotMine) {
      setQuotesNotMine(
        quotesNotMine.filter((q) => {
          console.log(q.tags);
          if (q.tags) {
            return q.tags.some((tag) => tag.tag == searchTagForNotMine);
          }
        })
      );
    } else {
      setQuotesNotMine(quotesNotMine.filter((q) => q.tags?.length === 0));
    }
  };

  return (
    <QuoteContext.Provider
      value={{
        allQuotes,
        getAllQuotes,
        loginUserQuotes,
        getLoginUserQuotes,
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
        setRandomQuote,
        setLockedQuote,
        searchTagForMine,
        setSearchTagForMine,
        searchTagForNotMine,
        setSearchTagForNotMine,
        fetchFilteredMyQuotes,
        fetchFilteredNotMyQuotes,
        sortByElement,
        setSortByElement,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}
