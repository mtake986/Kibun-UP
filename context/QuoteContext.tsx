"use client";
import { ReactNode, createContext, useContext, useState } from "react";
import { db, auth } from "../app/config/Firebase";
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
  DocumentData,
} from "firebase/firestore";
type QuoteProviderProps = {
  children: ReactNode;
};
import {
  IQuote,
  IQuoteInputValues,
  IFavQuote,
  IUserInfo,
  ISortFilterBy,
  ITag,
  IBookmark,
} from "@/types/type";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "@/components/ui/use-toast";
import { getRandomNum } from "../utils/functions";

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

  fetchFilteredMyQuotes: () => void;

  updateSortFilterByForMine: (which: string, ele: string) => void;
  sortFilterByForMine: ISortFilterBy;

  filteredLoginUserQuotes: IQuote[];
  setFilteredLoginUserQuotes: (quotes: IQuote[]) => void;

  fetchFilteredNotMyQuotes: () => void;

  updateSortFilterByForNotMine: (which: string, ele: string) => void;
  sortFilterByForNotMine: ISortFilterBy;

  filteredNotLoginUserQuotes: IQuote[];
  setFilteredNotLoginUserQuotes: (quotes: IQuote[]) => void;

  storeQuoteInBookmarks: (uid: string, qid: string) => void;
  removeQuoteFromBookmarks: (uid: string, qid: string) => void;
  fetchMyBookmarks: () => void;
  myBookmarks: IBookmark | undefined;
};

const QuoteContext = createContext({} as QuoteContext);

export function useQuote() {
  return useContext(QuoteContext);
}

export function QuoteProvider({ children }: QuoteProviderProps) {
  const [allQuotes, setAllQuotes] = useState<IQuote[]>([]);
  const [favQuotes, setFavQuotes] = useState<IFavQuote[]>([]);
  const [myBookmarks, setMyBookmarks] = useState<IBookmark>();
  const [loginUserQuotes, setLoginUserQuotes] = useState<IQuote[]>([]);
  const [randomQuote, setRandomQuote] = useState<IQuote>();
  const [lockedQuote, setLockedQuote] = useState<IQuote>();
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
  const [quotesNotMine, setQuotesNotMine] = useState<IQuote[]>([]);

  const quotesCollectionRef = collection(db, "quotes");
  const favQuotesCollectionRef = collection(db, "favQuotes");
  const bookmarksCollectionRef = collection(db, "bookmarks");

  const [user] = useAuthState(auth);

  const [sortFilterByForMine, setSortFilterByForMine] = useState<ISortFilterBy>(
    { order: "desc", sortByElement: "createdAt", searchTag: "" }
  );
  const [filteredLoginUserQuotes, setFilteredLoginUserQuotes] = useState<
    IQuote[]
  >([]);

  const [sortFilterByForNotMine, setSortFilterByForNotMine] =
    useState<ISortFilterBy>({
      order: "desc",
      sortByElement: "createdAt",
      searchTag: "",
    });
  const [filteredNotLoginUserQuotes, setFilteredNotLoginUserQuotes] = useState<
    IQuote[]
  >([]);

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
    setSortFilterByForNotMine({
      order: "desc",
      sortByElement: "createdAt",
      searchTag: "",
    });

    if (user) {
      const q = query(
        quotesCollectionRef,
        where("userInfo.uid", "!=", user.uid)
        // orderBy("createdAt", "desc")
      );
      onSnapshot(q, (snapshot) => {
        setQuotesNotMine(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as IQuote))
        );
      });
    }
  };

  const getLoginUserQuotes = async () => {
    setSortFilterByForMine({
      order: "desc",
      sortByElement: "createdAt",
      searchTag: "",
    });
    if (user?.uid) {
      const q = query(
        quotesCollectionRef,
        where("userInfo.uid", "==", user?.uid),
        orderBy(sortFilterByForMine.sortByElement, "desc")
      );

      onSnapshot(q, (snapshot) => {
        setLoginUserQuotes(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as IQuote))
        );
      });
    }
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
    let q = query(
      quotesCollectionRef,
      where("userInfo.uid", "==", user?.uid),
      orderBy("createdAt", "desc")
    );

    let qs;
    if (user?.uid) {
      if (sortFilterByForMine.sortByElement === "quote") {
        if (sortFilterByForMine.order === "asc")
          q = query(
            quotesCollectionRef,
            where("userInfo.uid", "==", user?.uid),
            orderBy("quote", "asc")
          );
        else if (sortFilterByForMine.order === "desc")
          q = query(
            quotesCollectionRef,
            where("userInfo.uid", "==", user?.uid),
            orderBy("quote", "desc")
          );
      } else if (sortFilterByForMine.sortByElement === "person") {
        if (sortFilterByForMine.order === "asc")
          q = query(
            quotesCollectionRef,
            where("userInfo.uid", "==", user?.uid),
            orderBy("person", "asc")
          );
        else if (sortFilterByForMine.order === "desc")
          q = query(
            quotesCollectionRef,
            where("userInfo.uid", "==", user?.uid),
            orderBy("person", "desc")
          );
      } else if (sortFilterByForMine.sortByElement === "createdAt") {
        if (sortFilterByForMine.order === "asc")
          q = query(
            quotesCollectionRef,
            where("userInfo.uid", "==", user?.uid),
            orderBy("createdAt", "asc")
          );
        else if (sortFilterByForMine.order === "desc")
          q = query(
            quotesCollectionRef,
            where("userInfo.uid", "==", user?.uid),
            orderBy("createdAt", "desc")
          );
      }
      if (sortFilterByForMine.searchTag) {
        onSnapshot(q, (snapshot) => {
          qs = snapshot.docs.filter((doc) => {
            if (doc.data().tags) {
              return (
                doc
                  .data()
                  // below return true or false
                  .tags.some(
                    (tag: ITag) => tag.tag === sortFilterByForMine.searchTag
                  )
              );
            }
          });
          console.log(qs);
          setLoginUserQuotes(
            qs.map((doc) => ({ ...doc.data(), id: doc.id } as IQuote))
          );
        });
      } else {
        onSnapshot(q, (snapshot) => {
          qs = snapshot.docs.filter((doc) => {
            if (doc.data().tags?.length === 0 || !doc.data().tags) {
              return true;
            }
          });
          console.log(qs);
          setLoginUserQuotes(
            qs.map((doc) => ({ ...doc.data(), id: doc.id } as IQuote))
          );
        });
      }
    }
  };

  const fetchFilteredNotMyQuotes = async () => {
    let q = query(
      quotesCollectionRef,
      // where("userInfo.uid", "!=", user?.uid),
      orderBy("createdAt", "desc")
    );
    console.log(123);

    let qs;

    if (user?.uid) {
      if (sortFilterByForNotMine.sortByElement === "quote") {
        if (sortFilterByForNotMine.order === "asc")
          q = query(
            quotesCollectionRef,
            // ERROR: QuoteContext.tsx:541 Uncaught (in promise) FirebaseError: Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field 'userInfo.uid' and so you must also use 'userInfo.uid' as your first argument to orderBy(), but your first orderBy() is on field 'person' instead.
            // where("userInfo.uid", "!=", user?.uid),
            orderBy("quote", "asc")
          );
        else if (sortFilterByForNotMine.order === "desc")
          q = query(
            quotesCollectionRef,
            // where("userInfo.uid", "!=", user?.uid),
            orderBy("quote", "desc")
          );
      } else if (sortFilterByForNotMine.sortByElement === "person") {
        if (sortFilterByForNotMine.order === "asc")
          q = query(
            quotesCollectionRef,
            // where("userInfo.uid", "!=", user?.uid),
            orderBy("person", "asc")
          );
        else if (sortFilterByForNotMine.order === "desc")
          q = query(
            quotesCollectionRef,
            // where("userInfo.uid", "!=", user?.uid),
            orderBy("person", "desc")
          );
      } else if (sortFilterByForNotMine.sortByElement === "createdAt") {
        if (sortFilterByForNotMine.order === "asc")
          q = query(
            quotesCollectionRef,
            // where("userInfo.uid", "!=", user?.uid),
            orderBy("createdAt", "asc")
          );
        else if (sortFilterByForNotMine.order === "desc")
          q = query(
            quotesCollectionRef,
            // where("userInfo.uid", "!=", user?.uid),
            orderBy("createdAt", "desc")
          );
      }

      if (sortFilterByForNotMine.searchTag) {
        onSnapshot(q, (snapshot) => {
          qs = snapshot.docs.filter((doc) => {
            if (doc.data().userInfo.uid !== user?.uid) {
              if (doc.data().tags) {
                return (
                  doc
                    .data()
                    // below return true or false
                    .tags.some(
                      (tag: ITag) =>
                        tag.tag === sortFilterByForNotMine.searchTag
                    )
                );
              }
            }
          });
          console.log(qs);
          setQuotesNotMine(
            qs.map((doc) => ({ ...doc.data(), id: doc.id } as IQuote))
          );
        });
      } else {
        onSnapshot(q, (snapshot) => {
          qs = snapshot.docs.filter((doc) => {
            if (doc.data().tags?.length === 0 || !doc.data().tags) {
              return true;
            }
          });
          console.log(qs);
          setQuotesNotMine(
            qs.map((doc) => ({ ...doc.data(), id: doc.id } as IQuote))
          );
        });
      }
    }
  };

  const updateSortFilterByForMine = (which: string, ele: string) => {
    if (which === "order") {
      setSortFilterByForMine((prev) => ({
        ...prev,
        order: ele,
      }));
    } else if (which === "sortByElement") {
      setSortFilterByForMine((prev) => ({
        ...prev,
        sortByElement: ele,
      }));
    } else if (which === "searchTag") {
      setSortFilterByForMine((prev) => ({
        ...prev,
        searchTag: ele,
      }));
    }
  };

  const updateSortFilterByForNotMine = (which: string, ele: string) => {
    if (which === "order") {
      setSortFilterByForNotMine((prev) => ({
        ...prev,
        order: ele,
      }));
    } else if (which === "sortByElement") {
      setSortFilterByForNotMine((prev) => ({
        ...prev,
        sortByElement: ele,
      }));
    } else if (which === "searchTag") {
      setSortFilterByForNotMine((prev) => ({
        ...prev,
        searchTag: ele,
      }));
    }
  };

  const storeQuoteInBookmarks = async (uid: string, qid: string) => {
    const docRef = doc(db, "bookmarks", uid);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    console.log(data);
    if (data) {
      await updateDoc(docRef, {
        qids: arrayUnion(qid),
      });
    } else {
      await setDoc(doc(db, "bookmarks", uid), { uid, qids: [qid] });
      console.log(123);
    }
  };

  const removeQuoteFromBookmarks = async (uid: string, qid: string) => {
    const docRef = doc(db, "bookmarks", uid);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    console.log(data);
    if (data?.qids.includes(qid) && data?.qids.length === 1) {
      await deleteDoc(doc(db, "bookmarks", uid));
    } else {
      await updateDoc(docRef, {
        qids: arrayRemove(qid),
      });
    }
  };

  const fetchMyBookmarks = async () => {
    let q = query(
      bookmarksCollectionRef,
      where("uid", "==", user?.uid),
    );

    onSnapshot(q, (snapshot) => {
      setMyBookmarks(
        snapshot.docs.map(doc => doc.data() as IBookmark)[0]
      );
    })
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

        fetchFilteredMyQuotes,

        updateSortFilterByForMine,
        sortFilterByForMine,

        filteredLoginUserQuotes,
        setFilteredLoginUserQuotes,

        fetchFilteredNotMyQuotes,

        updateSortFilterByForNotMine,
        sortFilterByForNotMine,

        filteredNotLoginUserQuotes,
        setFilteredNotLoginUserQuotes,

        storeQuoteInBookmarks,
        removeQuoteFromBookmarks,
        fetchMyBookmarks,
        myBookmarks,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}
