import { DEFAULT_URL_TO_FETCH_AUTHORS, alphabetArrs } from "@/data/CONSTANTS";
import { TypeAuthorOfAPI } from "@/types/type";
import React, { useState, useEffect, useCallback } from "react";

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

  // const fetchTotalPages = useCallback(async (url: string) => {
  //   setIsPending(true);
  //   fetch(url)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw Error(
  //           `Something went wrong while fetching authors!! status: ${response.status} ${response.statusText}`
  //         );
  //       }
  //       return response.json();
  //     })
  //     .then(async (res) => {
  //       if (totalPages === 0) await setTotalPages(res.totalPages);
  //     })
  //     .catch((err) => {
  //       setError(err.message);
  //       setIsPending(false);
  //     });
  // }, []);

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
  useEffect(() => {
    fetchTotalPages(DEFAULT_URL_TO_FETCH_AUTHORS).then(async () => {
      if (totalPages !== 0) {
        for (let i = 1; i <= totalPages; i++) {
          await fetchAuthors(`${DEFAULT_URL_TO_FETCH_AUTHORS}&page=${i}`);
        }
      }
    });
  }, []);

  return {
    currentAuthors,
    error,
    isPending,
    currentPage,
    setCurrentPage,
  };
};

export default useAuthorsOfAPI;
