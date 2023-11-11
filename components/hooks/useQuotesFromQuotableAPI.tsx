"use client";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/config/Firebase";
import { displayErrorToast } from "@/functions/displayToast";
import { DEFAULT_URL_FOR_ALL_QUOTES } from "@/data/CONSTANTS";
import { TypeQuote } from "@/types/type";
import { useAuthState } from "react-firebase-hooks/auth";

const useQuotesFromQuotableAPI = () => {
  const { loginUser, fetchLoginUser } = useAuth();
  const [data, setData] = useState<TypeQuote[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const [user] = useAuthState(auth);
  
  const fetchData = useCallback(async () => {
    setIsPending(true);
    if (loginUser) {
      fetch(DEFAULT_URL_FOR_ALL_QUOTES)
        .then((response) => {
          if (!response.ok) {
            throw Error(`不具合が発生しました!! status: ${response.status}`);
          }
          return response.json();
        })
        .then((res) => {
          console.log("res: ", res);
          const quotes = res.results.map((quote: any) => ({
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
          setData(quotes);
          // setTimeout(() => {
          setIsPending(false);
          // }, 500);
        })
        .catch((e) => {
          // error handling when no quote with this user's tag is found
          displayErrorToast(
            `Failed to fetch a quote with a tag, ${DEFAULT_URL_FOR_ALL_QUOTES}. Try again later.`
          );
        });
    } else {
      fetchLoginUser(auth.currentUser);
    }
  }, [user, loginUser]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isPending, error, refetch: fetchData };
};

export default useQuotesFromQuotableAPI;
