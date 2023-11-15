"use client";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/config/Firebase";
import { displayErrorToast } from "@/functions/displayToast";
import { AND_OR, DEFAULT_URL_FOR_ALL_QUOTES } from "@/data/CONSTANTS";
import { TypeAndOr, TypeQuote } from "@/types/type";
import useSelectedAuthors from "./useSelectedAuthors";

export type PropsFetchData = {
  currentPage: number;
  selectedTags: string[];
  selectedAuthors: string[];
  andOr: TypeAndOr;
};

const useQuotesFromQuotableAPI = () => {
  const { loginUser, fetchLoginUser } = useAuth();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // todo: pagination | need some states for current page, total pages, and different quotes-per-page
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [nPages, setNPages] = useState<number>(0);
  const [currentRecords, setCurrentRecords] = useState<TypeQuote[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [andOr, setAndOr] = useState<TypeAndOr>({ label: "or", value: "|" });
  const { selectedAuthors, handleAuthors } = useSelectedAuthors();

  const fetchData = useCallback(
    async ({
      currentPage,
      selectedTags,
      selectedAuthors,
      andOr,
    }: PropsFetchData) => {
      const pageNum = `page=${currentPage}`;
      const limit = `limit=${loginUser?.settings?.apiQuotesPerPage ?? 25}`;
      const tags = selectedTags ? `tags=${selectedTags.join(andOr.value)}` : "";
      const sortBy = "sortBy=author";
      const authors = selectedAuthors
        ? `author=${selectedAuthors.join("|")}`
        : "";

      const url =
        DEFAULT_URL_FOR_ALL_QUOTES +
        "?" +
        pageNum +
        "&" +
        limit +
        "&" +
        sortBy +
        "&" +
        tags +
        "&" +
        authors;

      console.log(url);

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
            setTotalCount(result.totalCount);

            const quotes: TypeQuote[] = result.results.map((quote: any) => ({
              id: quote._id,
              author: quote.author,
              authorSlug: quote.authorSlug,
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
    fetchData({ currentPage, selectedTags, selectedAuthors, andOr });
  }, [
    // loginUser?.settings?.apiQuotesPerPage,
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

  const handleAndOr = (value: string) => {
    setAndOr(AND_OR.find((ele) => ele.label === value) as TypeAndOr);
  };
  return {
    currentRecords,
    isPending,
    error,
    refetch: fetchData,
    setCurrentPage,
    currentPage,
    nPages,
    totalCount,
    selectedTags,
    setSelectedTags,
    handleTags,
    andOr,
    handleAndOr,
    selectedAuthors,
    handleAuthors,
    fetchData,
  };
};

export default useQuotesFromQuotableAPI;
