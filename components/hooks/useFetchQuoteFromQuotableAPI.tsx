"use client";
import { IQuote } from "@/types/type";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/config/Firebase";

const useFetchQuoteFromQuotableAPI = () => {
  const { loginUser, fetchLoginUser } = useAuth();

  const tag = loginUser?.settings.tagForQuotableApi;

  const randomNumber = (len: number) => Math.floor(Math.random() * len);

  const [data, setData] = useState<any>();
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    fetchLoginUser(auth.currentUser);
    console.log(tag);
    fetch(
      `https://api.quotable.io/quotes${
        tag === "random" ? "/random" : `?tags=` + tag
      }`
    )
      .then((response) => {
        if (!response.ok) {
          throw Error(`不具合が発生しました!! status: ${response.status}`);
        }
        return response.json();
      })
      .then((res) => {
        console.log(res.results.length, res);
        const len = res.results.length;
        const quote = res.results[randomNumber(len)];
        setData({
          id: quote._id,
          person: quote.author,
          quote: quote.content,
          tags: quote.tags,
        } as IQuote);
        setIsPending(false);
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      });
  }, [tag]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isPending, error, refetch: fetchData };
};

export default useFetchQuoteFromQuotableAPI;
