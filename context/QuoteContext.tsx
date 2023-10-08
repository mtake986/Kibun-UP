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
  IUserInfo,
  ISortFilterBy,
  ITag,
  ILoginUser,
  TypeMyFavs,
  TypeNumOfFavs,
  TypeMyBookmarks,
  TypeNumOfBookmarks,
} from "@/types/type";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "@/components/ui/use-toast";
import { getRandomNum } from "../utils/functions";

type QuoteProviderProps = {
  children: ReactNode;
};

type QuoteContext = {
  loginUserQuotes: IQuote[] | [];
  getLoginUserQuotes: () => void;
  handleCancelUpdate: () => void;
  handleDelete: (id: string) => void;

  randomQuote: IQuote | undefined;

  lockThisQuote: (uid: string, data: IQuote) => void;
  lockedQuote: IQuote | undefined;

  removeLockFromThisQuote: (uid: string) => void;
  getLockedQuote: () => void;

  isUpdateMode: boolean;
  toggleUpdateMode: (boo: boolean) => void;
  handleUpdate: (qid: string, values: IQuoteInputValues, uid?: string) => void;

  quotesNotMine: IQuote[];
  getQuotesNotMine: () => void;

  registerQuote: (values: IQuoteInputValues, userInfo: IUserInfo) => void;

  myFavs: TypeMyFavs;
  numOfFavs: TypeNumOfFavs[];
  storeFav: (uid: string, q: IQuote) => void;
  removeFav: (uid: string, q: IQuote) => void;
  fetchMyFavs: () => void;
  fetchNumOfFavs: () => void;

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
  myBookmarks: TypeMyBookmarks;

  fetchNumOfBookmarks: () => void;
  numOfBookmarks: TypeNumOfBookmarks[] | undefined;

  fetchQuotesForHomePage: (
    user: ILoginUser,
    setIsLoading: (boo: boolean) => void
  ) => void;
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

  updateRandomQuote: () => void;
};

const QuoteContext = createContext({} as QuoteContext);

export function useQuote() {
  return useContext(QuoteContext);
}

export function QuoteProvider({ children }: QuoteProviderProps) {
  const [myFavs, setMyFavs] = useState<TypeMyFavs>({} as TypeMyFavs);
  const [numOfFavs, setNumOfFavs] = useState<TypeNumOfFavs[]>([]);
  const [myBookmarks, setMyBookmarks] = useState<TypeMyBookmarks>({
    uid: "",
    qids: [],
    quotes: [],
  });
  const [numOfBookmarks, setNumOfBookmarks] = useState<TypeNumOfBookmarks[]>();
  const [loginUserQuotes, setLoginUserQuotes] = useState<IQuote[]>([]);
  const [randomQuote, setRandomQuote] = useState<IQuote>();
  const [lockedQuote, setLockedQuote] = useState<IQuote>();
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
  const [quotesNotMine, setQuotesNotMine] = useState<IQuote[]>([]);

  const quotesCollectionRef = collection(db, "quotes");
  const numOfFavsCollectionRef = collection(db, "numOfFavs");
  const MY_FAVS_COLLECTION_REF = collection(db, "myFavs");
  const myBookmarksCollectionRef = collection(db, "myBookmarks");
  const numOfBookmarksCollectionRef = collection(db, "numOfBookmarks");
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

  const handleCancelUpdate = () => {
    setIsUpdateMode(false);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "quotes", id));
  };

  const lockThisQuote = async (uid: string, data: any) => {
    let payload;
    if (!data.userInfo) {
      payload = { ...data, userInfo: { uid } };
    } else {
      payload = data;
    }
    await setDoc(doc(db, "lockedQuotes", uid), payload);
    setLockedQuote(data);
  };

  const removeLockFromThisQuote = async (uid: string) => {
    await deleteDoc(doc(db, "lockedQuotes", uid));
    setLockedQuote(undefined);
  };

  const getLockedQuote = async () => {
    if (user?.uid) {
      const q = query(
        lockedQuotesCollectionRef,
        where("userInfo.uid", "==", user?.uid)
      );
      onSnapshot(q, (snapshot) => {
        setLockedQuote(snapshot.docs[0]?.data() as IQuote);
      });
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
        if (uid) removeLockFromThisQuote(uid);
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

  const storeFav = async (uid: string, q: IQuote) => {
    const docRef = doc(db, "myFavs", uid);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    if (data) {
      await updateDoc(docRef, {
        qids: arrayUnion(q.id),
        quotes: arrayUnion(q),
      });
    } else {
      await setDoc(doc(db, "myFavs", uid), {
        uid,
        qids: [q.id],
        quotes: [q],
      });
    }

    const numOfFavsRef = doc(db, "numOfFavs", q.id);
    const numOfFavsDocSnap = await getDoc(numOfFavsRef);
    const nobData = numOfFavsDocSnap.data();
    if (nobData) {
      await updateDoc(numOfFavsRef, {
        uids: arrayUnion(uid),
      });
    } else {
      await setDoc(doc(db, "numOfFavs", q.id), { qid: q.id, uids: [uid] });
    }
  };

  const removeFav = async (uid: string, q: IQuote) => {
    const docRef = doc(db, "myFavs", uid);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    if (data?.qids.includes(q.id) && data?.qids.length === 1) {
      await deleteDoc(doc(db, "myFavs", uid));
    } else {
      await updateDoc(docRef, {
        qids: arrayRemove(q.id),
        quotes: arrayRemove(q),
      });
    }

    const numOfFavsDocRef = doc(db, "numOfFavs", q.id);
    const numOfFavsDocSnap = await getDoc(numOfFavsDocRef);
    const nobData = numOfFavsDocSnap.data();
    if (nobData?.uids.includes(uid) && nobData?.uids.length === 1) {
      await deleteDoc(doc(db, "numOfFavs", q.id));
    } else {
      await updateDoc(numOfFavsDocRef, {
        uids: arrayRemove(uid),
      });
    }
  };

  const fetchMyFavs = async () => {
    if (user) {
      let q = query(MY_FAVS_COLLECTION_REF, where("uid", "==", user?.uid));

      onSnapshot(q, (snapshot) => {
        setMyFavs(snapshot.docs.map((doc) => doc.data() as TypeMyFavs)[0]);
      });
    }
  };

  const fetchNumOfFavs = async () => {
    onSnapshot(numOfFavsCollectionRef, (snapshot) => {
      setNumOfFavs(snapshot.docs.map((doc) => doc.data() as TypeNumOfFavs));
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
        setMyBookmarks(
          snapshot.docs.map((doc) => doc.data() as TypeMyBookmarks)[0]
        );
      });
    }
  };

  const fetchNumOfBookmarks = async () => {
    onSnapshot(numOfBookmarksCollectionRef, (snapshot) => {
      setNumOfBookmarks(
        snapshot.docs.map((doc) => doc.data() as TypeNumOfBookmarks)
      );
    });
  };

  const fetchQuotesForHomePage = (
    user: ILoginUser,
    setIsLoading: (boo: boolean) => void
  ) => {
    setIsLoading(true);
    if (user.displayWhichQuoteType === "mine") {
      setQuotesForHomePage(loginUserQuotes);
    } else if (user.displayWhichQuoteType === "bookmarks") {
      setQuotesForHomePage(myBookmarks.quotes);
    } else {
      setQuotesForHomePage(loginUserQuotes.concat(myBookmarks.quotes));
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
      if (lu && lu.displayWhichQuoteType === "mine") {
        setRandomQuote({} as IQuote);
        qs = loginUserQuotes;
        const q = query(
          quotesCollectionRef,
          where("userInfo.uid", "==", user?.uid)
        );
        onSnapshot(q, (snapshot) => {
          const randomNum = getRandomNum(snapshot.docs.length);
          const doc = snapshot.docs[randomNum];
          if (doc) setRandomQuote({ ...doc.data(), id: doc.id } as IQuote);
        });
      } else if (lu && lu?.displayWhichQuoteType === "bookmarks") {
        setRandomQuote({} as IQuote);
        const q = query(
          myBookmarksCollectionRef,
          where("uid", "==", user?.uid)
        );
        onSnapshot(q, (snapshot) => {
          const bookmarkedQuotes = snapshot.docs[0].data().quotes;
          const randomNum = getRandomNum(bookmarkedQuotes.length);
          const doc = bookmarkedQuotes[randomNum];
          if (doc) setRandomQuote(doc as IQuote);
        });
      } else {
      fetch(`https://api.quotable.io/quotes?tags=famous-quotes`)
        .then((response) => {
          if (!response.ok) {
            throw Error(`不具合が発生しました!! status: ${response.status}`);
          }
          return response.json();
        })
        .then((res) => {
          setRandomQuote({
            person: res.author,
            quote: res.content,
          } as IQuote);
        })
        .catch((err) => {
          console.log(err.message);
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

        myFavs,
        numOfFavs,
        storeFav,
        removeFav,
        fetchMyFavs,
        fetchNumOfFavs,

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

        updateRandomQuote,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}
