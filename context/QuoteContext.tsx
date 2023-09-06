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
  DocumentData,
} from "firebase/firestore";

import {
  IQuote,
  IQuoteInputValues,
  IFavQuote,
  IUserInfo,
  ISortFilterBy,
  ITag,
  IBookmark,
  INumOfBookmarks,
  ILoginUser,
} from "@/types/type";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "@/components/ui/use-toast";
import { getRandomNum } from "../utils/functions";
import { useAuth } from "./AuthContext";

type QuoteProviderProps = {
  children: ReactNode;
};

type QuoteContext = {
  loginUserQuotes: IQuote[] | [];
  getLoginUserQuotes: () => void;
  handleCancelUpdate: () => void;
  handleDelete: (id: string) => void;

  getRandomQuote: () => void;
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
  setRandomQuote: (quote: IQuote | undefined) => void;
  setLockedQuote: (quote: IQuote | undefined) => void;

  sortAndFilterMyQuotes: () => void;

  updateSortFilterByForMine: (which: string, ele: string) => void;
  sortFilterByForMine: ISortFilterBy;

  sortAndFilterNotMyQuotes: () => void;

  updateSortFilterByForNotMine: (which: string, ele: string) => void;
  sortFilterByForNotMine: ISortFilterBy;

  storeQuoteInBookmarks: (uid: string, q: IQuote) => void;
  removeQuoteFromBookmarks: (uid: string, q: IQuote) => void;
  fetchMyBookmarks: () => void;
  myBookmarks: IBookmark;

  fetchNumOfBookmarks: () => void;
  numOfBookmarks: INumOfBookmarks[] | undefined;

  fetchQuotesForHomePage: (user: ILoginUser) => void;
  quotesForHomePage: IQuote[];

  whichList: "yours" | "all";
  handleWhichList: (value: "yours" | "all") => void;
  sortFilterAreaForMineShown: boolean;
  handleSortFilterAreaForMineShown: () => void;
  sortFilterAreaForNotMineShown: boolean;
  handleSortFilterAreaForNotMineShown: () => void;

  profileWhichTab: "quotes" | "bookmarks" | "likes" | "events";
  handleProfileWhichTab: (
    value: "quotes" | "bookmarks" | "likes" | "events"
  ) => void;
  isSortFilterAreaForProfileQuotesShown: boolean;
  toggleSortFilterAreaForProfileQuotes: () => void;

  isRegisterFormOpen: boolean;
  toggleRegisterFormOpen: () => void;

  onlySortMyQuotes: () => void;
  onlySortNotMyQuotes: () => void;

  isSortFilterByForMineDefaultValue: boolean;
  checkSortFilterByForMineDefaultValue: () => void;

  isSortFilterByForNotMineDefaultValue: boolean;
  checkSortFilterByForNotMineDefaultValue: () => void;

  resetSortFilterByForMineInputs: () => void;
  resetSortFilterByForNotMineInputs: () => void;
};

const QuoteContext = createContext({} as QuoteContext);

export function useQuote() {
  return useContext(QuoteContext);
}

export function QuoteProvider({ children }: QuoteProviderProps) {
  const [favQuotes, setFavQuotes] = useState<IFavQuote[]>([]);
  const [myBookmarks, setMyBookmarks] = useState<IBookmark>({
    uid: "",
    qids: [],
    quotes: [],
  });
  const [numOfBookmarks, setNumOfBookmarks] = useState<INumOfBookmarks[]>();
  const [loginUserQuotes, setLoginUserQuotes] = useState<IQuote[]>([]);
  const [randomQuote, setRandomQuote] = useState<IQuote>();
  const [lockedQuote, setLockedQuote] = useState<IQuote>();
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
  const [quotesNotMine, setQuotesNotMine] = useState<IQuote[]>([]);

  const quotesCollectionRef = collection(db, "quotes");
  const favQuotesCollectionRef = collection(db, "favQuotes");
  const myBookmarksCollectionRef = collection(db, "myBookmarks");
  const numOfBookmarksCollectionRef = collection(db, "numOfBookmarks");

  const [user] = useAuthState(auth);

  const [sortFilterByForMine, setSortFilterByForMine] = useState<ISortFilterBy>(
    { order: "desc", sortByElement: "createdAt", searchTag: "" }
  );

  const [sortFilterByForNotMine, setSortFilterByForNotMine] =
    useState<ISortFilterBy>({
      order: "desc",
      sortByElement: "createdAt",
      searchTag: "",
    });

  const [quotesForHomePage, setQuotesForHomePage] = useState<IQuote[]>([]);

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

  const getQuotesNotMine = async () => {
    if (user) {
      const q = query(
        quotesCollectionRef,
        // where("userInfo.uid", "!=", user.uid),
        orderBy("createdAt", "desc")
      );

      onSnapshot(q, (snapshot) => {
        let qs = snapshot.docs.filter((doc) => {
          if (doc.data().userInfo.uid !== user.uid) {
            return true;
          }
        });
        setQuotesNotMine(
          qs.map((doc) => ({ ...doc.data(), id: doc.id } as IQuote))
        );
      });
    }
  };

  const getLoginUserQuotes = async () => {
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

  // todo
  const getRandomQuote = async () => {
    // auth.onAuthStateChanged((user) => {
    if (user) {
      try {
        // if (loginUser?.displayWhichQuoteType === "mine") {
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
        // } else if (loginUser?.displayWhichQuoteType === "bookmarks") {
        //   const q = query(
        //     myBookmarksCollectionRef,
        //     where("uid", "==", user?.uid)
        //   );
        //   onSnapshot(q, (snapshot) => {
        //     const randomNum = getRandomNum(
        //       snapshot.docs[0].data().quotes.length
        //     );
        //     // console.log(randomNum, snapshot.docs[0].data().quotes.length);
        //     const doc = snapshot.docs[0].data().quotes[randomNum];
        //     if (doc) setRandomQuote(doc as IQuote);
        //   });
        // }
      } catch (error) {
        console.log("getRandomQuote, ", error);
      }
    }
    // });
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

  const sortAndFilterMyQuotes = async () => {
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
          setLoginUserQuotes(
            qs.map((doc) => ({ ...doc.data(), id: doc.id } as IQuote))
          );
        });
      }
    }

    setIsSortFilterByForMineDefaultValue(false);
  };

  const sortAndFilterNotMyQuotes = async () => {
    let q = query(
      quotesCollectionRef,
      // where("userInfo.uid", "!=", user?.uid),
      orderBy("createdAt", "desc")
    );

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
          setQuotesNotMine(
            qs.map((doc) => ({ ...doc.data(), id: doc.id } as IQuote))
          );
        });
      } else {
        onSnapshot(q, (snapshot) => {
          qs = snapshot.docs.filter((doc) => {
            if (doc.data().userInfo.uid !== user?.uid) {
              if (doc.data().tags?.length === 0 || !doc.data().tags) {
                return true;
              }
            }
          });

          setQuotesNotMine(
            qs.map((doc) => ({ ...doc.data(), id: doc.id } as IQuote))
          );
        });
      }
    }
    setIsSortFilterByForMineDefaultValue(false);
  };

  const onlySortMyQuotes = () => {
    let q = query(
      quotesCollectionRef,
      where("userInfo.uid", "==", user?.uid),
      orderBy("createdAt", "desc")
    );

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

      onSnapshot(q, (snapshot) => {
        setLoginUserQuotes(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as IQuote))
        );
      });
    }

    checkSortFilterByForMineDefaultValue();
  };
  const onlySortNotMyQuotes = () => {
    let q = query(
      quotesCollectionRef,
      // where("userInfo.uid", "!=", user?.uid),
      orderBy("createdAt", "desc")
    );

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

      onSnapshot(q, (snapshot) => {
        setQuotesNotMine(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as IQuote))
        );
      });
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

  const storeQuoteInBookmarks = async (uid: string, q: IQuote) => {
    const docRef = doc(db, "myBookmarks", uid);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    if (data) {
      await updateDoc(docRef, {
        qids: arrayUnion(q.id),
        quotes: arrayUnion(q),
      });
    } else {
      await setDoc(doc(db, "myBookmarks", uid), {
        uid,
        qids: [q.id],
        quotes: [q],
      });
    }

    const numOfBookmarksRef = doc(db, "numOfBookmarks", q.id);
    const numOfBookmarksDocSnap = await getDoc(numOfBookmarksRef);
    const nobData = numOfBookmarksDocSnap.data();
    if (nobData) {
      await updateDoc(numOfBookmarksRef, {
        uids: arrayUnion(uid),
      });
    } else {
      await setDoc(doc(db, "numOfBookmarks", q.id), { qid: q.id, uids: [uid] });
    }
  };

  const removeQuoteFromBookmarks = async (uid: string, q: IQuote) => {
    const docRef = doc(db, "myBookmarks", uid);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    if (data?.qids.includes(q.id) && data?.qids.length === 1) {
      await deleteDoc(doc(db, "myBookmarks", uid));
    } else {
      await updateDoc(docRef, {
        qids: arrayRemove(q.id),
        quotes: arrayRemove(q),
      });
    }

    const numOfBookmarksDocRef = doc(db, "numOfBookmarks", q.id);
    const numOfBookmarksDocSnap = await getDoc(numOfBookmarksDocRef);
    const nobData = numOfBookmarksDocSnap.data();
    if (nobData?.uids.includes(uid) && nobData?.uids.length === 1) {
      await deleteDoc(doc(db, "numOfBookmarks", q.id));
    } else {
      await updateDoc(numOfBookmarksDocRef, {
        uids: arrayRemove(uid),
      });
    }
  };

  const fetchMyBookmarks = async () => {
    if (user) {
      let q = query(myBookmarksCollectionRef, where("uid", "==", user?.uid));

      onSnapshot(q, (snapshot) => {
        setMyBookmarks(snapshot.docs.map((doc) => doc.data() as IBookmark)[0]);
      });
    }
  };

  const fetchNumOfBookmarks = async () => {
    onSnapshot(numOfBookmarksCollectionRef, (snapshot) => {
      setNumOfBookmarks(
        snapshot.docs.map((doc) => doc.data() as INumOfBookmarks)
      );
    });
  };

  const fetchQuotesForHomePage = (user: ILoginUser) => {
    console.log("fetchQuotesForHomePage", user);
    if (user.displayWhichQuoteType === "mine") {
      setQuotesForHomePage(loginUserQuotes);
    } else if (user.displayWhichQuoteType === "bookmarks") {
      setQuotesForHomePage(myBookmarks.quotes);
    } else {
      setQuotesForHomePage(loginUserQuotes.concat(myBookmarks.quotes));
    }
  };

  const [whichList, setWhichList] = useState<"yours" | "all">("yours");
  const handleWhichList = (value: "yours" | "all") => {
    setWhichList(value);
  };

  const [sortFilterAreaForMineShown, setSortFilterAreaForMineShown] =
    useState(false);
  const handleSortFilterAreaForMineShown = () => {
    setSortFilterAreaForMineShown((prev) => !prev);
  };

  const [sortFilterAreaForNotMineShown, setSortFilterAreaForNotMineShown] =
    useState(false);
  const handleSortFilterAreaForNotMineShown = () => {
    setSortFilterAreaForNotMineShown((prev) => !prev);
  };

  const [profileWhichTab, setProfileWhichTab] = useState<
    "quotes" | "bookmarks" | "likes" | "events"
  >("quotes");
  const handleProfileWhichTab = (
    value: "quotes" | "bookmarks" | "likes" | "events"
  ) => {
    setProfileWhichTab(value);
  };

  const [
    isSortFilterAreaForProfileQuotesShown,
    setIsSortFilterAreaForProfileQuotesShown,
  ] = useState(false);
  const toggleSortFilterAreaForProfileQuotes = () => {
    setIsSortFilterAreaForProfileQuotesShown((prev) => !prev);
  };

  const [isRegisterFormOpen, setIsRegisterFormOpen] = useState<boolean>(false);
  const toggleRegisterFormOpen = () => {
    setIsRegisterFormOpen((prev) => !prev);
  };

  const [
    isSortFilterByForMineDefaultValue,
    setIsSortFilterByForMineDefaultValue,
  ] = useState<boolean>(true);
  const checkSortFilterByForMineDefaultValue = () => {
    sortFilterByForMine.order !== "desc" ||
    sortFilterByForMine.sortByElement !== "createdAt" ||
    sortFilterByForMine.searchTag !== ""
      ? setIsSortFilterByForMineDefaultValue(false)
      : setIsSortFilterByForMineDefaultValue(true);
  };

  const [
    isSortFilterByForNotMineDefaultValue,
    setIsSortFilterByForNotMineDefaultValue,
  ] = useState<boolean>(true);
  const checkSortFilterByForNotMineDefaultValue = () => {
    sortFilterByForNotMine.order !== "desc" ||
    sortFilterByForNotMine.sortByElement !== "createdAt" ||
    sortFilterByForNotMine.searchTag !== ""
      ? setIsSortFilterByForNotMineDefaultValue(false)
      : setIsSortFilterByForNotMineDefaultValue(true);
  };

  const resetSortFilterByForNotMineInputs = () => {
    setSortFilterByForNotMine({
      order: "desc",
      sortByElement: "createdAt",
      searchTag: "",
    });
    setIsSortFilterByForNotMineDefaultValue(true);
  };

  const resetSortFilterByForMineInputs = () => {
    setSortFilterByForMine({
      order: "desc",
      sortByElement: "createdAt",
      searchTag: "",
    });
    setIsSortFilterByForMineDefaultValue(true);
  };

  return (
    <QuoteContext.Provider
      value={{
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
        setRandomQuote,
        setLockedQuote,

        sortAndFilterMyQuotes,

        updateSortFilterByForMine,
        sortFilterByForMine,

        sortAndFilterNotMyQuotes,

        updateSortFilterByForNotMine,
        sortFilterByForNotMine,

        storeQuoteInBookmarks,
        removeQuoteFromBookmarks,
        fetchMyBookmarks,
        myBookmarks,

        fetchNumOfBookmarks,
        numOfBookmarks,

        fetchQuotesForHomePage,
        quotesForHomePage,

        whichList,
        handleWhichList,
        sortFilterAreaForMineShown,
        handleSortFilterAreaForMineShown,
        sortFilterAreaForNotMineShown,
        handleSortFilterAreaForNotMineShown,

        profileWhichTab,
        handleProfileWhichTab,
        isSortFilterAreaForProfileQuotesShown,
        toggleSortFilterAreaForProfileQuotes,

        isRegisterFormOpen,
        toggleRegisterFormOpen,

        onlySortMyQuotes,
        onlySortNotMyQuotes,

        isSortFilterByForMineDefaultValue,
        checkSortFilterByForMineDefaultValue,
        isSortFilterByForNotMineDefaultValue,
        checkSortFilterByForNotMineDefaultValue,

        resetSortFilterByForMineInputs,
        resetSortFilterByForNotMineInputs,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}
