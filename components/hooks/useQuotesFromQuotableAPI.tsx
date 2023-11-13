"use client";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/config/Firebase";
import { displayErrorToast } from "@/functions/displayToast";
import { DEFAULT_URL_FOR_ALL_QUOTES } from "@/data/CONSTANTS";
import { TypeQuote, typeQuotesPerPage } from "@/types/type";

const useQuotesFromQuotableAPI = () => {
  const { loginUser, fetchLoginUser } = useAuth();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState(null);

  // todo: pagination | need some states for current page, total pages, and different quotes-per-page
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [nPages, setNPages] = useState<number>(0);
  const [currentRecords, setCurrentRecords] = useState<TypeQuote[]>([]);
  const [quotesPerPage, setQuotesPerPage] = useState<typeQuotesPerPage>(10);
  
  const fetchData = useCallback(async (currentPage: number) => {
    const url = DEFAULT_URL_FOR_ALL_QUOTES + `?page=${currentPage}`;
    console.log(url);
    setIsPending(true);
    if (loginUser) {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw Error(`不具合が発生しました!! status: ${response.status}`);
          }
          return response.json();
        })
        .then((result) => {
          console.log("result: ", result);
          setNPages(result.totalPages);

          const quotes = result.results.map((quote: any) => ({
            id: quote._id,
            author: quote.author,
            content: quote.content,
            tags: quote.tags.map((tag: string) => {
              return { name: tag, color: "white" };
            }),
            likedBy: [],
            bookmarkedBy: [],
            userInfo: "api",
            isDraft: false,
          }));
          setCurrentRecords(quotes);
          setIsPending(false);
        })
        .catch((e) => {
          displayErrorToast(
            `Failed to fetch a quote with a tag, ${url}. Try again later.`
          );
        });
    } else {
      fetchLoginUser(auth.currentUser);
    }
  }, []);

  const changeQuotesPerPage = (quotesPerPage: typeQuotesPerPage) => {
    setQuotesPerPage(quotesPerPage);
    setCurrentPage(1);
  }

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return {
    currentRecords,
    isPending,
    error,
    refetch: fetchData,
    setCurrentPage,
    currentPage,
    nPages,
    setNPages,
    quotesPerPage,
    setQuotesPerPage,
    changeQuotesPerPage,
  };
};

export default useQuotesFromQuotableAPI;
