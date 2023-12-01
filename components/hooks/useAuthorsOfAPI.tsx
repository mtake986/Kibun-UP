import { db } from "@/config/Firebase";
import { useAuth } from "@/context/AuthContext";
import { DEFAULT_URL_TO_FETCH_AUTHORS, alphabetArrs } from "@/data/CONSTANTS";
import { displayErrorToast } from "@/functions/displayToast";
import { TypeAuthorOfAPI, TypeLikedAuthorsOfAPI } from "@/types/type";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useState, useEffect, useCallback } from "react";

const useAuthorsOfAPI = () => {
  const { loginUser } = useAuth();

  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<Error | null>();
  const [isPending, setIsPending] = useState<boolean>(false);

  // todo: pagination | need some states for current page, total pages, and different quotes-per-page
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentAuthors, setCurrentAuthors] = useState<TypeAuthorOfAPI[][]>([
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]);

  const [likedAuthorsOfAPI, setLikedAuthorsOfAPI] =
    useState<TypeLikedAuthorsOfAPI>();

  const putAuthorIntoArray = (author: any) => {
    const { _id, name, bio, description, link, quoteCount, slug } = author;
    if (author.quoteCount > 0) {
      alphabetArrs.forEach((arr: Array<string>, i: number) => {
        if (arr.includes(name[0].toUpperCase())) {
          setCurrentAuthors((prev) => {
            const newPrev = [...prev];
            newPrev[i].push({
              _id,
              name,
              bio,
              description,
              link,
              quoteCount,
              slug,
            });
            return newPrev;
          });
        }
      });
    }
  };

  const fetchTotalPages = useCallback(async (url: string) => {
    setIsPending(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw Error(
          `Something went wrong while fetching authors!! status: ${response.status} ${response.statusText}`
        );
      }
      const res = await response.json();
      if (totalPages === 0) setTotalPages(res.totalPages);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsPending(false);
    }
  }, []);

  const fetchAuthors = useCallback(
    async (url: string) => {
      setIsPending(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw Error(
            `Something went wrong while fetching authors!! status: ${response.status} ${response.statusText}`
          );
        }
        const res = await response.json();
        res.results.forEach((author: any) => {
          putAuthorIntoArray(author);
        });
      } catch (err: any) {
        setError(err);
      } finally {
        setIsPending(false);
      }
    },
    [currentAuthors]
  );

  const likeAuthor = async (uid: string, slug: string) => {
    const authorDocRef = doc(db, "likedAuthorsOfAPI", uid);
    const authorDocSnap = await getDoc(authorDocRef);
    if (authorDocSnap.exists()) {
      await updateDoc(authorDocRef, {
        likedAuthors: arrayUnion(slug),
      }).catch((e) => {
        displayErrorToast({
          e,
        });
      });
    } else {
      await setDoc(doc(db, "likedAuthorsOfAPI", uid), {
        uid,
        likedAuthors: [slug],
        createdAt: serverTimestamp(),
      });
    }
  };

  const removeLikeFromAuthor = async (uid: string, slug: string) => {
    const authorDocRef = doc(db, "likedAuthorsOfAPI", uid);
    const authorDocSnap = await getDoc(authorDocRef);
    if (authorDocSnap.exists()) {
      await updateDoc(authorDocRef, {
        likedAuthors: arrayRemove(slug),
      }).catch((e) => {
        displayErrorToast({
          e,
        });
      });
    }
  };

  const fetchAuthorsOfAPIFromFirestore = (uid: string) => {
    const q = query(
      collection(db, "likedAuthorsOfAPI"),
      where("uid", "==", uid)
    );
    onSnapshot(q, (snapshot) => {
      setLikedAuthorsOfAPI(snapshot.docs[0]?.data() as TypeLikedAuthorsOfAPI);
    });
  };

  return {
    currentAuthors,
    error,
    isPending,
    currentPage,
    setCurrentPage,
    likeAuthor,
    removeLikeFromAuthor,
    fetchTotalPages,
    totalPages,
    fetchAuthors,
    fetchAuthorsOfAPIFromFirestore,
    likedAuthorsOfAPI,
  };
};

export default useAuthorsOfAPI;
