"use client";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/config/Firebase";
import { displayErrorToast } from "@/functions/displayToast";
import { DEFAULT_URL_FOR_RANDOM_QUOTE } from "@/data/CONSTANTS";
import { TypeAPIQuote, TypeQuote } from "@/types/type";
import useSelectedAuthors from "./useSelectedAuthors";

const useFetchQuoteFromQuotableAPI = (url: string) => {
  const { loginUser, fetchLoginUser } = useAuth();
  const [data, setData] = useState<TypeAPIQuote>();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string | Error | null>(null);

  const fetchData = useCallback(async () => {
    setIsPending(true);
    if (!loginUser) fetchLoginUser(auth.currentUser);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(
            `Something went wrong!! status: ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((res) => {
        setData({
          id: res[0]._id,
          author: res[0].author,
          content: res[0].content,
          tags: res[0].tags.map((tag: string) => {
            return { name: tag, color: "white" };
          }),
          likedBy: [],
          bookmarkedBy: [],
          userInfo: "api",
          draftStatus: "Public",
          authorSlug: res[0].authorSlug,
        });
        setIsPending(false);
      })
      .catch((e) => {
        // error handling when no quote with this user's tag is found
        displayErrorToast(
          `Failed to fetch a quote with a tag. Try again later. \n Error: ${e}`
        );
        setIsPending(false);
      });
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isPending, error, refetch: fetchData };
};

export default useFetchQuoteFromQuotableAPI;
