"use client";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/config/Firebase";
import { displayErrorToast } from "@/functions/displayToast";
import { DEFAULT_URL_FOR_ALL_QUOTES } from "@/data/CONSTANTS";
import { TypeQuote, TypeQuotesPerPage } from "@/types/type";

const useQuotesFromQuotableAPI = () => {
  const { loginUser, fetchLoginUser } = useAuth();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // todo: pagination | need some states for current page, total pages, and different quotes-per-page
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [nPages, setNPages] = useState<number>(0);
  const [currentRecords, setCurrentRecords] = useState<TypeQuote[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const fetchData = useCallback(
    async (currentPage: number, selectedTags: string[]) => {
      const pageNum = `page=${currentPage}`;
      const limit = `limit=${loginUser?.settings?.apiQuotesPerPage ?? 25}`;
      const tags = selectedTags ? `tags=${selectedTags.join("|")}` : "";
      const sortBy = "sortBy=author";
      const url =
        DEFAULT_URL_FOR_ALL_QUOTES +
        "?" +
        pageNum +
        "&" +
        limit +
        "&" +
        sortBy +
        "&" +
        tags;
      setIsPending(true);
      if (loginUser) {
        fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw Error(
                `Something went wrong!! status: ${response.status}, ${response.statusText}`
              );
            }
            return response.json();
          })
          .then((result) => {
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
              `Failed to fetch quotes. Please try again later. Error: ${e.message}`
            );
            setError(e.message);
            setIsPending(false);
          });
      } else {
        fetchLoginUser(auth.currentUser);
      }
    },
    [loginUser, loginUser?.settings?.apiQuotesPerPage]
  );

  useEffect(() => {
    fetchData(currentPage, selectedTags);
  }, [
    currentPage,
    loginUser?.settings?.apiQuotesPerPage,
    selectedTags,
    fetchData,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [loginUser?.settings?.apiQuotesPerPage]);

  const handleTags = (value: string) => {
    setSelectedTags(() => {
      if (selectedTags.includes(value)) {
        return selectedTags.filter((tag) => tag !== value);
      } else {
        return [...selectedTags, value];
      }
    });
  };
  return {
    currentRecords,
    isPending,
    error,
    refetch: fetchData,
    setCurrentPage,
    currentPage,
    nPages,
    setNPages,
    selectedTags,
    setSelectedTags,
    handleTags,
  };
};

export default useQuotesFromQuotableAPI;
