"use client";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/config/Firebase";
import { displayErrorToast } from "@/functions/displayToast";
import { DEFAULT_URL_FOR_ALL_QUOTES } from "@/data/CONSTANTS";
import {
  TypeAPIQuote,
  TypeAndOr,
  TypeQuote,
  TypeSelectedAuthors,
  TypeSortBy,
} from "@/types/type";
import useSelectedAuthors from "./useSelectedAuthors";
import useFetchTags from "./useFetchTags";
import useAndOr from "./useAndOr";
import useSortBy from "./useSortBy";

export type PropsFetchData = {
  currentPage: number;
  selectedTags: string[];
  selectedAuthors: TypeSelectedAuthors[];
  andOr: TypeAndOr;
  sortBy: TypeSortBy;
};

const useQuotesFromQuotableAPI = () => {
  const { loginUser, fetchLoginUser } = useAuth();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // todo: pagination | need some states for current page, total pages, and different quotes-per-page
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [nPages, setNPages] = useState<number>(0);
  const [currentRecords, setCurrentRecords] = useState<TypeAPIQuote[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const { selectedAuthors, handleAuthors } = useSelectedAuthors();
  const { selectedTags, handleTags } = useFetchTags();
  const { andOr, handleAndOr } = useAndOr();
  const { sortBy, handleSortBy } = useSortBy();

  const fetchData = useCallback(
    async ({
      currentPage,
      selectedTags,
      selectedAuthors,
      andOr,
      sortBy,
    }: PropsFetchData) => {
      const pageNum = `?page=${currentPage}`;
      const limit = `&limit=${loginUser?.settings?.apiQuotesPerPage ?? 25}`;
      const tags =
        selectedTags.length > 0
          ? `&tags=${selectedTags.join(andOr.value)}`
          : "";
      const sortByStr = `&sortBy=${sortBy.value}`;
      const listOfAuthors = selectedAuthors.map((author) => author.slug);
      const authors =
        listOfAuthors.length > 0 ? `&author=${listOfAuthors.join("|")}` : "";

      const url =
        DEFAULT_URL_FOR_ALL_QUOTES +
        pageNum +
        limit +
        sortByStr +
        tags +
        authors;

      setIsPending(true);
      if (loginUser) {
        fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw Error(
                `Something went wrong!! status: ${response.status} ${response.statusText}`
              );
            }
            return response.json();
          })
          .then((result) => {
            setNPages(result.totalPages);
            setTotalCount(result.totalCount);
            const quotes: TypeAPIQuote[] = result.results.map((quote: any) => {
              const tags = quote.tags.map((tag: string) => {
                const tagObject = { name: tag, color: "white" };
                return tagObject;
              });
              const quoteObject: TypeAPIQuote = {
                id: quote._id,
                author: quote.author,
                authorSlug: quote.authorSlug,
                content: quote.content,
                tags: tags,
                likedBy: [],
                bookmarkedBy: [],
                userInfo: "api",
                draftStatus: "Public",
              };
              return quoteObject;
            });
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
    setCurrentPage(1);
  }, [loginUser?.settings?.apiQuotesPerPage]);

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
    handleTags,
    andOr,
    handleAndOr,
    selectedAuthors,
    handleAuthors,
    fetchData,

    sortBy,
    handleSortBy,
  };
};

export default useQuotesFromQuotableAPI;
