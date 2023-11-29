import { DEFAULT_URL_TO_FETCH_AUTHORS, alphabetArrs } from "@/data/CONSTANTS";
import { removeDuplicates } from "@/functions/functions";
import { TypeAuthorOfAPI, TypeTagsQuotableAPI } from "@/types/type";
import React, { useState, useEffect, useCallback } from "react";

const useAuthorsOfAPI = () => {
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<string>();
  const [isPending, setIsPending] = useState<boolean>(false);

  // todo: pagination | need some states for current page, total pages, and different quotes-per-page
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [nPages, setNPages] = useState<number>(5);
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

  const fetchTotalPages = useCallback(async (url: string) => {
    setIsPending(true);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(
            `Something went wrong while fetching authors!! status: ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      })
      .then(async (res) => {
        if (totalPages === 0) await setTotalPages(res.totalPages);
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }, []);

  const fetchAuthors = useCallback(
    (url: string, i: number) => {
      setIsPending(true);
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw Error(
              `Something went wrong while fetching authors!! status: ${response.status} ${response.statusText}`
            );
          }
          return response.json();
        })
        .then((res) => {
          res.results.forEach((author: any) => {
            putAuthorIntoArray(author);
          });
        })
        .catch((err) => {
          setError(err.message);
          setIsPending(false);
        });
    },
    [currentAuthors]
  );

  useEffect(() => {
    fetchTotalPages(DEFAULT_URL_TO_FETCH_AUTHORS).then(() => {
      if (totalPages !== 0) {
        for (let i = 1; i <= totalPages; i++) {
          fetchAuthors(`${DEFAULT_URL_TO_FETCH_AUTHORS}&page=${i}`, i);
        }
      }
    });
  }, [totalPages]);

  return {
    currentAuthors,
    error,
    isPending,
    nPages,
    currentPage,
    setCurrentPage,
  };
};

export default useAuthorsOfAPI;
