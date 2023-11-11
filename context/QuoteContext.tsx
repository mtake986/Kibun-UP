"use client";
import { ReactNode, createContext, useContext, useState } from "react";
import { db, auth } from "../config/Firebase";
import {
  collection,
  query,
  where,
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

import {
  TypeQuote,
  TypeQuoteInputValues,
  IUserInfo,
  ISortFilterBy,
  ITag,
  TypeLoginUser,
} from "@/types/type";
import { useAuthState } from "react-firebase-hooks/auth";
import { getRandomNum } from "../functions/functions";
import {
  displayErrorToast,
  displaySuccessToast,
} from "@/functions/displayToast";

type QuoteProviderProps = {
  children: ReactNode;
};

type QuoteContext = {
  loginUserQuotes: TypeQuote[] | [];
  getLoginUserQuotes: () => void;
  handleCancelUpdate: () => void;
  handleDelete: (id: string) => void;

  randomQuote: TypeQuote | undefined;

  lockThisQuote: (uid: string, data: TypeQuote) => void;
  lockedQuote: TypeQuote | undefined;

  removeLockFromThisQuote: (uid: string) => void;
  getLockedQuote: () => void;

  isUpdateMode: boolean;
  toggleUpdateMode: (boo: boolean) => void;
  handleUpdate: (
    values: TypeQuoteInputValues,
    qid: string,
    setIsLoading: (boo: boolean) => void,
    uid?: string
  ) => void;

  quotesNotMine: TypeQuote[];
  getQuotesNotMine: () => void;

  registerQuote: (values: TypeQuoteInputValues, userInfo: IUserInfo) => void;

  storeFav: (uid: string, q: TypeQuote) => void;
  removeFav: (uid: string, q: TypeQuote) => void;
  storeBookmark: (uid: string, q: TypeQuote) => void;
  removeBookmark: (uid: string, q: TypeQuote) => void;

  setRandomQuote: (quote: TypeQuote | undefined) => void;
  setLockedQuote: (quote: TypeQuote | undefined) => void;

  sortAndFilterMyQuotes: () => void;

  updateSortFilterByForMine: (which: string, ele: string) => void;
  sortFilterByForMine: ISortFilterBy;

  sortAndFilterNotMyQuotes: () => void;

  updateSortFilterByForNotMine: (which: string, ele: string) => void;
  sortFilterByForNotMine: ISortFilterBy;

  fetchQuotesForHomePage: (
    user: TypeLoginUser,
    setIsLoading: (boo: boolean) => void
  ) => void;
  quotesForHomePage: TypeQuote[];

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

  updateRandomQuote: () => void;

  fetchAllQuotes: () => void;
  allQuotes: TypeQuote[];
};

const QuoteContext = createContext({} as QuoteContext);

export function useQuote() {
  return useContext(QuoteContext);
}

export function QuoteProvider({ children }: QuoteProviderProps) {
  const [loginUserQuotes, setLoginUserQuotes] = useState<TypeQuote[]>([]);
  const [randomQuote, setRandomQuote] = useState<TypeQuote>();
  const [lockedQuote, setLockedQuote] = useState<TypeQuote>();
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
  const [quotesNotMine, setQuotesNotMine] = useState<TypeQuote[]>([]);
  const [allQuotes, setAllQuotes] = useState<TypeQuote[]>([]);

  const quotesCollectionRef = collection(db, "quotes");
  const lockedQuotesCollectionRef = collection(db, "lockedQuotes");

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

  const [quotesForHomePage, setQuotesForHomePage] = useState<TypeQuote[]>([]);

  const registerQuote = async (
    values: TypeQuoteInputValues,
    userInfo: IUserInfo
  ) => {
    await addDoc(quotesCollectionRef, {
      ...values,
      userInfo,
      likedBy: [],
      bookmarkedBy: [],
      createdAt: serverTimestamp(),
    }).then(() => {
      displaySuccessToast({
        text: "Success: Created",
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
          qs.map((doc) => ({ ...doc.data(), id: doc.id } as TypeQuote))
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
          snapshot.docs.map(
            (doc) => ({ ...doc.data(), id: doc.id } as TypeQuote)
          )
        );
      });
    }
  };

  const handleCancelUpdate = () => {
    setIsUpdateMode(false);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "quotes", id));
  };

  const lockThisQuote = async (uid: string, data: TypeQuote) => {
    await setDoc(doc(db, "lockedQuotes", uid), {
      ...data,
      qid: data.id,
      uid: uid,
    });
    setLockedQuote(data);
  };

  const removeLockFromThisQuote = async (uid: string) => {
    await deleteDoc(doc(db, "lockedQuotes", uid));
    setLockedQuote(undefined);
  };

  const getLockedQuote = () => {
    const q = query(lockedQuotesCollectionRef, where("uid", "==", user?.uid));
    onSnapshot(q, (snapshot) => {
      if (snapshot.docs[0]) {
        setLockedQuote(snapshot.docs[0]?.data() as TypeQuote);
      } else {
        // Handle the case when snapshot.docs[0] is undefined
      }
    });
  };

  const handleUpdate = async (
    values: TypeQuoteInputValues,
    qid: string,
    setIsLoading: (boo: boolean) => void,
    uid?: string
  ) => {
    setIsLoading(true);
    const docRef = doc(db, "quotes", qid);
    await updateDoc(docRef, {
      ...values,
      updatedAt: serverTimestamp(),
    }).then((res) => {
      if (lockedQuote?.id === qid && values.isDraft) {
        if (uid) removeLockFromThisQuote(uid);
        displaySuccessToast({
          text: "Updated",
        });
      }
      setTimeout(() => {
        setIsLoading(false);
        displaySuccessToast({
          text: "Updated",
        });
      }, 500);
    });
  };

  const toggleUpdateMode = (boo: boolean) => {
    setIsUpdateMode(boo);
  };

  const storeFav = async (uid: string, q: TypeQuote) => {
    const quoteDocRef = doc(db, "quotes", q.id);
    const quoteDocSnap = await getDoc(quoteDocRef);
    if (quoteDocSnap.exists()) {
      await updateDoc(quoteDocRef, {
        likedBy: arrayUnion(uid),
      }).catch((e) => {
        displayErrorToast({
          e,
        });
      });
    } else {
      await setDoc(doc(db, "quotes", q.id), {
        ...q,
        likedBy: [uid],
        createdAt: serverTimestamp(),
      });
    }
  };

  const removeFav = async (uid: string, q: TypeQuote) => {
    const quoteDocRef = doc(db, "quotes", q.id);
    const quoteDocSnap = await getDoc(quoteDocRef);
    if (quoteDocSnap.exists()) {
      await updateDoc(quoteDocRef, {
        likedBy: arrayRemove(uid),
      }).catch((e) => {
        displayErrorToast({
          e,
        });
      });
    }
  };

  const fetchAllQuotes = () => {
    const q = query(quotesCollectionRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      setAllQuotes(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as TypeQuote))
      );
    });
  };

  const storeBookmark = async (uid: string, q: TypeQuote) => {
    const quoteDocRef = doc(db, "quotes", q.id);
    const quoteDocSnap = await getDoc(quoteDocRef);
    if (quoteDocSnap.exists()) {
      await updateDoc(quoteDocRef, {
        bookmarkedBy: arrayUnion(uid),
      }).catch((e) => {
        displayErrorToast({
          e,
        });
      });
    } else {
      await setDoc(doc(db, "quotes", q.id), {
        ...q,
        bookmarkedBy: [uid],
        createdAt: serverTimestamp(),
      });
    }
  };

  const removeBookmark = async (uid: string, q: TypeQuote) => {
    const quoteDocRef = doc(db, "quotes", q.id);
    const quoteDocSnap = await getDoc(quoteDocRef);
    if (quoteDocSnap.exists()) {
      await updateDoc(quoteDocRef, {
        bookmarkedBy: arrayRemove(uid),
      }).catch((e) => {
        displayErrorToast(e);
      });
    }
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
      } else if (sortFilterByForMine.sortByElement === "author") {
        if (sortFilterByForMine.order === "asc")
          q = query(
            quotesCollectionRef,
            where("userInfo.uid", "==", user?.uid),
            orderBy("author", "asc")
          );
        else if (sortFilterByForMine.order === "desc")
          q = query(
            quotesCollectionRef,
            where("userInfo.uid", "==", user?.uid),
            orderBy("author", "desc")
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
                    (tag: ITag) => tag.name === sortFilterByForMine.searchTag
                  )
              );
            }
          });
          setLoginUserQuotes(
            qs.map((doc) => ({ ...doc.data(), id: doc.id } as TypeQuote))
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
            qs.map((doc) => ({ ...doc.data(), id: doc.id } as TypeQuote))
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
            // ERROR: QuoteContext.tsx:541 Uncaught (in promise) FirebaseError: Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field 'userInfo.uid' and so you must also use 'userInfo.uid' as your first argument to orderBy(), but your first orderBy() is on field 'author' instead.
            // where("userInfo.uid", "!=", user?.uid),
            orderBy("quote", "asc")
          );
        else if (sortFilterByForNotMine.order === "desc")
          q = query(
            quotesCollectionRef,
            // where("userInfo.uid", "!=", user?.uid),
            orderBy("quote", "desc")
          );
      } else if (sortFilterByForNotMine.sortByElement === "author") {
        if (sortFilterByForNotMine.order === "asc")
          q = query(
            quotesCollectionRef,
            // where("userInfo.uid", "!=", user?.uid),
            orderBy("author", "asc")
          );
        else if (sortFilterByForNotMine.order === "desc")
          q = query(
            quotesCollectionRef,
            // where("userInfo.uid", "!=", user?.uid),
            orderBy("author", "desc")
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
                        tag.name === sortFilterByForNotMine.searchTag
                    )
                );
              }
            }
          });
          setQuotesNotMine(
            qs.map((doc) => ({ ...doc.data(), id: doc.id } as TypeQuote))
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
            qs.map((doc) => ({ ...doc.data(), id: doc.id } as TypeQuote))
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
      } else if (sortFilterByForMine.sortByElement === "author") {
        if (sortFilterByForMine.order === "asc")
          q = query(
            quotesCollectionRef,
            where("userInfo.uid", "==", user?.uid),
            orderBy("author", "asc")
          );
        else if (sortFilterByForMine.order === "desc")
          q = query(
            quotesCollectionRef,
            where("userInfo.uid", "==", user?.uid),
            orderBy("author", "desc")
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
          snapshot.docs.map(
            (doc) => ({ ...doc.data(), id: doc.id } as TypeQuote)
          )
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
            // ERROR: QuoteContext.tsx:541 Uncaught (in promise) FirebaseError: Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field 'userInfo.uid' and so you must also use 'userInfo.uid' as your first argument to orderBy(), but your first orderBy() is on field 'author' instead.
            // where("userInfo.uid", "!=", user?.uid),
            orderBy("quote", "asc")
          );
        else if (sortFilterByForNotMine.order === "desc")
          q = query(
            quotesCollectionRef,
            // where("userInfo.uid", "!=", user?.uid),
            orderBy("quote", "desc")
          );
      } else if (sortFilterByForNotMine.sortByElement === "author") {
        if (sortFilterByForNotMine.order === "asc")
          q = query(
            quotesCollectionRef,
            // where("userInfo.uid", "!=", user?.uid),
            orderBy("author", "asc")
          );
        else if (sortFilterByForNotMine.order === "desc")
          q = query(
            quotesCollectionRef,
            // where("userInfo.uid", "!=", user?.uid),
            orderBy("author", "desc")
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
          snapshot.docs.map(
            (doc) => ({ ...doc.data(), id: doc.id } as TypeQuote)
          )
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

  const fetchQuotesForHomePage = (
    user: TypeLoginUser,
    setIsLoading: (boo: boolean) => void
  ) => {
    setIsLoading(true);
    if (user.settings.quoteTypeForHome === "mine") {
      setQuotesForHomePage(loginUserQuotes);
    } else if (user.settings.quoteTypeForHome === "bookmarks") {
      // setQuotesForHomePage(myBookmarks.quotes);
    } else {
      // setQuotesForHomePage(loginUserQuotes.concat(myBookmarks.quotes));
    }
    setIsLoading(false);
  };

  const updateRandomQuote = async () => {
    let qs, lu;
    if (user) {
      const userDocRef = doc(db, "users", user?.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        lu = docSnap.data();
      }
      if (lu && lu.settings.quoteTypeForHome === "mine") {
        setRandomQuote({} as TypeQuote);
        qs = loginUserQuotes;
        const q = query(
          quotesCollectionRef,
          where("userInfo.uid", "==", user?.uid)
        );
        onSnapshot(q, (snapshot) => {
          const randomNum = getRandomNum(snapshot.docs.length);
          const doc = snapshot.docs[randomNum];
          if (doc) setRandomQuote({ ...doc.data(), id: doc.id } as TypeQuote);
        });
      } else if (lu && lu?.settings.quoteTypeForHome === "bookmarks") {
        // setRandomQuote({} as TypeQuote);
        // const q = query(
        //   myBookmarksCollectionRef,
        //   where("uid", "==", user?.uid)
        // );
        // onSnapshot(q, (snapshot) => {
        //   const bookmarkedQuotes = snapshot.docs[0].data().quotes;
        //   const randomNum = getRandomNum(bookmarkedQuotes.length);
        //   const doc = bookmarkedQuotes[randomNum];
        //   if (doc) setRandomQuote(doc as TypeQuote);
        // });
      } else {
        fetch(
          `https://api.quotable.io/quotes?tags=${lu?.settings.tagForQuotableApi}`
        )
          .then((response) => {
            if (!response.ok) {
              throw Error(`不具合が発生しました!! status: ${response.status}`);
            }
            return response.json();
          })
          .then((res) => {
            setRandomQuote({
              author: res.author,
              content: res.content,
            } as TypeQuote);
          })
          .catch((e) => {
            displayErrorToast(e.message);
          });
      }
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
        randomQuote,
        lockThisQuote,
        lockedQuote,
        removeLockFromThisQuote,
        getLockedQuote,
        isUpdateMode,
        toggleUpdateMode,
        handleUpdate,
        quotesNotMine,
        getQuotesNotMine,
        registerQuote,

        storeFav,
        removeFav,
        storeBookmark,
        removeBookmark,

        setRandomQuote,
        setLockedQuote,

        sortAndFilterMyQuotes,

        updateSortFilterByForMine,
        sortFilterByForMine,

        sortAndFilterNotMyQuotes,

        updateSortFilterByForNotMine,
        sortFilterByForNotMine,

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

        updateRandomQuote,

        fetchAllQuotes,
        allQuotes,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}
