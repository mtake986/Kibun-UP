"use client";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/config/Firebase";
import { displayErrorToast } from "@/functions/displayToast";
import { DEFAULT_URL_FOR_RANDOM_QUOTE } from "@/data/CONSTANTS";
import { TypeQuote } from "@/types/type";

const useFetchQuoteFromQuotableAPI = (url: string) => {
  const { loginUser, fetchLoginUser } = useAuth();
  const [data, setData] = useState<TypeQuote>();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsPending(true);
    if (!loginUser) fetchLoginUser(auth.currentUser);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(`Something went wrong!! status: ${response.status}`);
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
          isDraft: false,
        });
        // setTimeout(() => {
        setIsPending(false);
        // }, 500);
      })
      .catch((e) => {
        // error handling when no quote with this user's tag is found
        displayErrorToast(
          `Failed to fetch a quote with a tag, ${url}. Try again later.`
        );
        setIsPending(false);
        // fetch(DEFAULT_URL_FOR_RANDOM_QUOTE)
        //   .then((response) => {
        //     if (!response.ok) {
        //       throw Error(`Something went wrong!! status: ${response.status}`);
        //     }
        //     return response.json();
        //   })
        //   .then((res) => {
        //     setData({
        //       id: res[0]._id,
        //       author: res[0].author,
        //       content: res[0].content,
        //       tags: res[0].tags,
        //     } as TypeQuote);
        //     // setTimeout(() => {
        //     setIsPending(false);
        //     // }, 500);
        //   })
        //   .catch((e) => {
        //     // error handling when failed to even fetch a quote randomly
        //     displayErrorToast(
        //       `Failed to fetch a random quote, ${url}. Try again later.`
        //     );
        //     setError(e.message);
        //     // setTimeout(() => {
        //     setIsPending(false);
        //     // }, 500);
        //   });
      });
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isPending, error, refetch: fetchData };
};

export default useFetchQuoteFromQuotableAPI;
