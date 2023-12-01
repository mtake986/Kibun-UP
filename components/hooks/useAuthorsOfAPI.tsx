
import { useAuth } from "@/context/AuthContext";
import { alphabetArrs } from "@/data/CONSTANTS";
import { TypeAuthorOfAPI, TypeLikedAuthorsOfAPI } from "@/types/type";

import React, { useState, useCallback } from "react";

const useAuthorsOfAPI = () => {

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
      return res.totalPages;
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

  return {
    currentAuthors,
    error,
    isPending,
    currentPage,
    setCurrentPage,
    fetchTotalPages,
    totalPages,
    fetchAuthors,
    likedAuthorsOfAPI,
  };
};

export default useAuthorsOfAPI;
