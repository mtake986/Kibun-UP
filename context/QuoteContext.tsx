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
  getDocs,
} from "firebase/firestore";

import {
  TypeQuote,
  TypeQuoteInputValues,
  TypeSortFilterBy,
  ITag,
  TypeUserFromFirestore,
  TypeAPIQuote,
  TypeTempLockedQuote,
  TypeFetchMineOrNot,
  TypeSortOrder,
  TypeSortBy2,
  TypeSortType,
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

type TypeQuoteContext = {
  loginUserQuotes: TypeQuote[] | [];
  getLoginUserQuotes: () => Promise<void>;
  handleCancelUpdate: () => void;
  handleDelete: (id: string) => Promise<void>;

  randomQuote: TypeQuote | undefined;

  lockThisQuote: (uid: string, q: TypeQuote | TypeAPIQuote) => void;
  lockedQuote: TypeQuote | TypeAPIQuote | undefined;

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

  registerQuote: (values: TypeQuoteInputValues, uid: string) => void;

  storeFav: (uid: string, q: TypeQuote) => void;
  removeFav: (uid: string, q: TypeQuote) => void;
  storeBookmark: (uid: string, q: TypeQuote) => void;
  removeBookmark: (uid: string, q: TypeQuote) => void;

  setRandomQuote: (quote: TypeQuote | undefined) => void;
  setLockedQuote: (quote: TypeQuote | undefined) => void;

  sortAndFilterQuotes: (
    fetchWhose: TypeFetchMineOrNot,
    sortVariablesForMine: TypeSortFilterBy
  ) => void;

  updateSortVariablesForMine: (which: TypeSortType, ele: any) => void;
  sortVariablesForMine: TypeSortFilterBy;

  sortAndFilterNotMyQuotes: () => void;

  updateSortFilterByForNotMine: (which: string, ele: any) => void;
  sortFilterByForNotMine: TypeSortFilterBy;

  fetchQuotesForHomePage: (
    user: TypeUserFromFirestore,
    setIsLoading: (boo: boolean) => void
  ) => void;
  quotesForHomePage: TypeQuote[];

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

  isSortVariablesForMineDefaultValue: boolean;
  checkSortVariablesForMineDefaultValue: () => void;

  isSortFilterByForNotMineDefaultValue: boolean;
  checkSortFilterByForNotMineDefaultValue: () => void;

  resetSortVariablesForMineInputs: () => void;
  resetSortFilterByForNotMineInputs: () => void;

  updateRandomQuote: () => void;

  fetchAllQuotes: () => void;
  allQuotes: TypeQuote[];

  apiQuotesFromFirestore: TypeAPIQuote[];
  fetchApiQuotesFromFirestore: () => void;
  handleLikeApiQuote: (uid: string, q: TypeAPIQuote) => Promise<void>;
  handleBookmarkApiQuote: (uid: string, q: TypeAPIQuote) => Promise<void>;
  getCreatorPhoto: (uid: string) => Promise<string>;

  fetchProfileUserQuotes: (uid: string) => void;
  profileUserQuotes: TypeQuote[];
  sortedFilteredMyQuotes: TypeQuote[];
  sortedFilteredNotMyQuotes: TypeQuote[];
};

const QuoteContext = createContext({} as TypeQuoteContext);

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
  const [apiQuotesFromFirestore, setApiQuotesFromFirestore] = useState<
    TypeAPIQuote[]
  >([]);
  const [sortedFilteredMyQuotes, setSortedFilteredMyQuotes] = useState<
    TypeQuote[]
  >([]);
  const [sortedFilteredNotMyQuotes, setSortedFilteredNotMyQuotes] = useState<
    TypeQuote[]
  >([]);

  const quotesCollectionRef = collection(db, "quotes");
  const lockedQuotesCollectionRef = collection(db, "lockedQuotes");
  const apiQuotesFromFirestoreCollectionRef = collection(db, "apiQuotes");

  const [user] = useAuthState(auth);

  const [sortVariablesForMine, setSortVariablesForMine] =
    useState<TypeSortFilterBy>({
      order: "desc",
      sortByElement: "createdAt",
      searchTag: "",
    });

  const [sortFilterByForNotMine, setSortFilterByForNotMine] =
    useState<TypeSortFilterBy>({
      order: "desc",
      sortByElement: "createdAt",
      searchTag: "",
    });

  const [quotesForHomePage, setQuotesForHomePage] = useState<TypeQuote[]>([]);

  const registerQuote = async (values: TypeQuoteInputValues, uid: string) => {
    const currTime = serverTimestamp();
    await addDoc(quotesCollectionRef, {
      ...values,
      createdBy: uid,
      likedBy: [],
      bookmarkedBy: [],
      createdAt: currTime,
      updatedAt: currTime,
    }).then(() => {
      displaySuccessToast({
        text: "Success: Created",
      });
    });
  };

  const getQuotesNotMine = async () => {
    setLoginUserQuotes([]);
    if (!user) return;

    const q = query(quotesCollectionRef, where("createdBy", "!=", user.uid));

    onSnapshot(q, (snapshot) => {
      setQuotesNotMine(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as TypeQuote))
      );
    });
  };

  const getLoginUserQuotes = async () => {
    if (user?.uid) {
      const q = query(quotesCollectionRef, where("createdBy", "==", user.uid));
      onSnapshot(q, async (snapshot) => {
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

  const lockThisQuote = async (uid: string, q: TypeQuote | TypeAPIQuote) => {
    await setDoc(doc(db, "lockedQuotes", uid), {
      qid: q.id,
      createdBy: q.createdBy,
    });
  };

  const removeLockFromThisQuote = async (uid: string) => {
    await deleteDoc(doc(db, "lockedQuotes", uid));
    setLockedQuote(undefined);
  };

  const getLockedQuote = async () => {
    let tempLockedQuote: TypeTempLockedQuote = {
      createdBy: "",
      qid: "",
      id: "",
    };

    if (user?.uid) {
      const q = query(lockedQuotesCollectionRef);
      onSnapshot(q, (snapshot) => {
        const lockedQuoteDoc = snapshot.docs.find((doc) => doc.id === user.uid);
        if (lockedQuoteDoc) {
          tempLockedQuote = {
            ...lockedQuoteDoc.data(),
            id: lockedQuoteDoc.id,
          } as TypeTempLockedQuote;
        }

        // todo: TypeError
        const isAPI = tempLockedQuote?.createdBy === "api";
        if (isAPI) {
          const q = query(apiQuotesFromFirestoreCollectionRef);
          onSnapshot(q, (snapshot) => {
            const apiQuoteDoc = snapshot.docs.find(
              (doc) => doc.id === tempLockedQuote.qid
            );
            if (apiQuoteDoc) {
              setLockedQuote({
                ...apiQuoteDoc.data(),
                id: apiQuoteDoc.id,
              } as TypeAPIQuote);
            }
          });
        } else {
          const q = query(quotesCollectionRef);
          onSnapshot(q, (snapshot) => {
            const quoteDoc = snapshot.docs.find(
              (doc) => doc.id === tempLockedQuote.qid
            );
            if (quoteDoc) {
              setLockedQuote({
                ...quoteDoc.data(),
                id: quoteDoc.id,
              } as TypeQuote);
            }
          });
        }
      });
    }
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
      if (lockedQuote?.id === qid && values.draftStatus === "Draft") {
        if (uid) removeLockFromThisQuote(uid);
      }
      setIsLoading(false);
      displaySuccessToast({
        text: "Updated",
      });
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
        updatedAt: serverTimestamp(),
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
        updatedAt: serverTimestamp(),
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

  // todo: not allowed to use a different value from where()
  const sortAndFilterQuotes = async (
    fetchWhose: TypeFetchMineOrNot,
    sortVariablesForMine: TypeSortFilterBy
  ) => {
    let q = query(
      quotesCollectionRef,
      orderBy(sortVariablesForMine.sortByElement, sortVariablesForMine.order)
    );

    const querySnapshot = await getDocs(q);
    let tempQs: TypeQuote[] = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      if (
        doc
          .data()
          .tags.some(
            (tag: { color: string; name: string }) =>
              tag.name === sortVariablesForMine.searchTag
          )
      ) {
        tempQs.push({ ...doc.data(), id: doc.id } as TypeQuote);
      }
    });

    if (fetchWhose === "mine") {
      setSortedFilteredMyQuotes(
        tempQs.filter((q) => q.createdBy === user?.uid)
      );
    } else {
      setQuotesNotMine(tempQs.filter((q) => q.createdBy !== user?.uid));
    }
  };

  // todo: Refactor, comment int should be fine
  const sortAndFilterNotMyQuotes = async () => {
    let q = query(
      quotesCollectionRef,
      // where("createdBy", "!=", user?.uid),
      orderBy("createdAt", "desc")
    );

    let qs;

    if (!user?.uid) return;

    if (sortFilterByForNotMine.sortByElement === "quote") {
      if (sortFilterByForNotMine.order === "asc")
        q = query(
          quotesCollectionRef,
          // where("createdBy", "!=", user?.uid),
          orderBy("quote", "asc")
        );
      else if (sortFilterByForNotMine.order === "desc")
        q = query(
          quotesCollectionRef,
          // where("createdBy", "!=", user?.uid),
          orderBy("quote", "desc")
        );
    } else if (sortFilterByForNotMine.sortByElement === "author") {
      if (sortFilterByForNotMine.order === "asc")
        q = query(
          quotesCollectionRef,
          // where("createdBy", "!=", user?.uid),
          orderBy("author", "asc")
        );
      else if (sortFilterByForNotMine.order === "desc")
        q = query(
          quotesCollectionRef,
          // where("createdBy", "!=", user?.uid),
          orderBy("author", "desc")
        );
    } else if (sortFilterByForNotMine.sortByElement === "createdAt") {
      if (sortFilterByForNotMine.order === "asc")
        q = query(
          quotesCollectionRef,
          // where("createdBy", "!=", user?.uid),
          orderBy("createdAt", "asc")
        );
      else if (sortFilterByForNotMine.order === "desc")
        q = query(
          quotesCollectionRef,
          // where("createdBy", "!=", user?.uid),
          orderBy("createdAt", "desc")
        );
    }

    if (sortFilterByForNotMine.searchTag) {
      onSnapshot(q, (snapshot) => {
        qs = snapshot.docs.filter((doc) => {
          if (doc.data().uid !== user?.uid) {
            if (doc.data().tags) {
              return (
                doc
                  .data()
                  // below return true or false
                  .tags.some(
                    (tag: ITag) => tag.name === sortFilterByForNotMine.searchTag
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
          if (doc.data().uid !== user?.uid) {
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
  };

  const onlySortMyQuotes = async () => {
    let q = query(
      quotesCollectionRef,
      where("createdBy", "==", user?.uid),
      orderBy("createdAt", "desc")
    );

    if (user?.uid) {
      if (sortVariablesForMine.sortByElement === "quote") {
        if (sortVariablesForMine.order === "asc")
          q = query(
            quotesCollectionRef,
            where("createdBy", "==", user?.uid),
            orderBy("quote", "asc")
          );
        else if (sortVariablesForMine.order === "desc")
          q = query(
            quotesCollectionRef,
            where("createdBy", "==", user?.uid),
            orderBy("quote", "desc")
          );
      } else if (sortVariablesForMine.sortByElement === "author") {
        if (sortVariablesForMine.order === "asc")
          q = query(
            quotesCollectionRef,
            where("createdBy", "==", user?.uid),
            orderBy("author", "asc")
          );
        else if (sortVariablesForMine.order === "desc")
          q = query(
            quotesCollectionRef,
            where("createdBy", "==", user?.uid),
            orderBy("author", "desc")
          );
      } else if (sortVariablesForMine.sortByElement === "createdAt") {
        if (sortVariablesForMine.order === "asc")
          q = query(
            quotesCollectionRef,
            where("createdBy", "==", user?.uid),
            orderBy("createdAt", "asc")
          );
        else if (sortVariablesForMine.order === "desc")
          q = query(
            quotesCollectionRef,
            where("createdBy", "==", user?.uid),
            orderBy("createdAt", "desc")
          );
      }

      await onSnapshot(q, (snapshot) => {
        setLoginUserQuotes(
          snapshot.docs.map(
            (doc) => ({ ...doc.data(), id: doc.id } as TypeQuote)
          )
        );
      });
    }

    checkSortVariablesForMineDefaultValue();
  };
  const onlySortNotMyQuotes = () => {
    let q = query(
      quotesCollectionRef,
      // where("createdBy", "!=", user?.uid),
      orderBy("createdAt", "desc")
    );

    if (!user?.uid) return;

    if (sortFilterByForNotMine.sortByElement === "quote") {
      if (sortFilterByForNotMine.order === "asc")
        q = query(
          quotesCollectionRef,
          // ERROR: QuoteContext.tsx:541 Uncaught (in promise) FirebaseError: Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field 'uid' and so you must also use 'uid' as your first argument to orderBy(), but your first orderBy() is on field 'author' instead.
          // where("createdBy", "!=", user?.uid),
          orderBy("quote", "asc")
        );
      else if (sortFilterByForNotMine.order === "desc")
        q = query(
          quotesCollectionRef,
          // where("createdBy", "!=", user?.uid),
          orderBy("quote", "desc")
        );
    } else if (sortFilterByForNotMine.sortByElement === "author") {
      if (sortFilterByForNotMine.order === "asc")
        q = query(
          quotesCollectionRef,
          // where("createdBy", "!=", user?.uid),
          orderBy("author", "asc")
        );
      else if (sortFilterByForNotMine.order === "desc")
        q = query(
          quotesCollectionRef,
          // where("createdBy", "!=", user?.uid),
          orderBy("author", "desc")
        );
    } else if (sortFilterByForNotMine.sortByElement === "createdAt") {
      if (sortFilterByForNotMine.order === "asc")
        q = query(
          quotesCollectionRef,
          // where("createdBy", "!=", user?.uid),
          orderBy("createdAt", "asc")
        );
      else if (sortFilterByForNotMine.order === "desc")
        q = query(
          quotesCollectionRef,
          // where("createdBy", "!=", user?.uid),
          orderBy("createdAt", "desc")
        );
    }

    onSnapshot(q, (snapshot) => {
      setQuotesNotMine(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as TypeQuote))
      );
    });
  };

  const updateSortVariablesForMine = (which: TypeSortType, ele: any) => {
    if (which === "order") {
      setSortVariablesForMine((prev) => ({
        ...prev,
        order: ele,
      }));
    } else if (which === "sortBy") {
      setSortVariablesForMine((prev) => ({
        ...prev,
        sortByElement: ele,
      }));
    } else if (which === "tag") {
      setSortVariablesForMine((prev) => ({
        ...prev,
        searchTag: ele,
      }));
    }
  };

  const updateSortFilterByForNotMine = (which: string, ele: any) => {
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
    user: TypeUserFromFirestore,
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
          where("createdBy", "==", user?.uid)
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
        //   where("createdBy", "==", user?.uid)
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
              throw Error(
                `Something went wrong!! Status: ${response.status}, ${response.statusText}`
              );
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
    isSortVariablesForMineDefaultValue,
    setIsSortVariablesForMineDefaultValue,
  ] = useState<boolean>(true);

  const checkSortVariablesForMineDefaultValue = () => {
    if (
      sortVariablesForMine.order === "desc" &&
      sortVariablesForMine.sortByElement === "createdAt" &&
      sortVariablesForMine.searchTag === ""
    ) {
      setIsSortVariablesForMineDefaultValue(true);
    } else {
      setIsSortVariablesForMineDefaultValue(false);
    }
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

  const resetSortVariablesForMineInputs = () => {
    setSortVariablesForMine({
      order: "desc",
      sortByElement: "createdAt",
      searchTag: "",
    });
    setIsSortVariablesForMineDefaultValue(true);
  };

  // API Quotes from Firestore
  const fetchApiQuotesFromFirestore = () => {
    const q = query(
      apiQuotesFromFirestoreCollectionRef,
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      setApiQuotesFromFirestore(
        snapshot.docs.map(
          (doc) => ({ ...doc.data(), id: doc.id } as TypeAPIQuote)
        )
      );
    });
  };

  const handleLikeApiQuote = async (uid: string, data: TypeAPIQuote) => {
    const quoteDocRef = doc(db, "apiQuotes", data.id);
    const quoteDocSnap = await getDoc(quoteDocRef);
    if (quoteDocSnap.exists()) {
      if (quoteDocSnap.data().likedBy.includes(uid)) {
        await updateDoc(quoteDocRef, {
          likedBy: arrayRemove(uid),
        }).catch((e) => {
          displayErrorToast({
            e,
          });
        });
      } else {
        await updateDoc(quoteDocRef, {
          likedBy: arrayUnion(uid),
        }).catch((e) => {
          displayErrorToast({
            e,
          });
        });
      }
    } else {
      const currTime = serverTimestamp();
      await setDoc(doc(db, "apiQuotes", data.id), {
        ...data,
        likedBy: [uid],
        bookmarkedBy: [],
        createdBy: "api",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
  };

  const handleBookmarkApiQuote = async (uid: string, data: TypeAPIQuote) => {
    const quoteDocRef = doc(db, "apiQuotes", data.id);
    const quoteDocSnap = await getDoc(quoteDocRef);
    if (quoteDocSnap.exists()) {
      if (quoteDocSnap.data().bookmarkedBy.includes(uid)) {
        await updateDoc(quoteDocRef, {
          bookmarkedBy: arrayRemove(uid),
        }).catch((e) => {
          displayErrorToast({
            e,
          });
        });
      } else {
        await updateDoc(quoteDocRef, {
          bookmarkedBy: arrayUnion(uid),
        }).catch((e) => {
          displayErrorToast({
            e,
          });
        });
      }
    } else {
      const currTime = serverTimestamp();
      await setDoc(doc(db, "apiQuotes", data.id), {
        ...data,
        createdBy: "api",
        likedBy: [],
        bookmarkedBy: [uid],
        createdAt: currTime,
        updatedAt: currTime,
      });
    }
  };

  const getCreatorPhoto = async (uid: string): Promise<string> => {
    const userDocRef = doc(db, "users", uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      return docSnap.data()?.photoURL;
    }
    return "";
  };

  const [profileUserQuotes, setProfileUserQuotes] = useState<TypeQuote[]>([]);
  const fetchProfileUserQuotes = async (uid: string) => {
    const q = query(collection(db, "quotes"), where("createdBy", "==", uid));

    const querySnapshot = await getDocs(q);
    let qs: TypeQuote[] = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      qs.push({ ...doc.data(), id: doc.id } as TypeQuote);
    });

    setProfileUserQuotes(qs);
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

        sortAndFilterQuotes,

        updateSortVariablesForMine,
        sortVariablesForMine,

        sortAndFilterNotMyQuotes,

        updateSortFilterByForNotMine,
        sortFilterByForNotMine,

        fetchQuotesForHomePage,
        quotesForHomePage,

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

        isSortVariablesForMineDefaultValue,
        checkSortVariablesForMineDefaultValue,
        isSortFilterByForNotMineDefaultValue,
        checkSortFilterByForNotMineDefaultValue,

        resetSortVariablesForMineInputs,
        resetSortFilterByForNotMineInputs,

        updateRandomQuote,

        fetchAllQuotes,
        allQuotes,

        apiQuotesFromFirestore,
        fetchApiQuotesFromFirestore,
        handleLikeApiQuote,
        handleBookmarkApiQuote,
        getCreatorPhoto,

        fetchProfileUserQuotes,
        profileUserQuotes,
        sortedFilteredMyQuotes,
        sortedFilteredNotMyQuotes,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}
