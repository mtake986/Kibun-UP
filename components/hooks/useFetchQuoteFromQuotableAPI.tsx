"use client";
import { TypeQuote, TypeQuoteQuotetableAPI } from "@/types/type";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/config/Firebase";

const useFetchQuoteFromQuotableAPI = () => {
  const { loginUser, fetchLoginUser } = useAuth();

  const tag = loginUser?.settings.tagForQuotableApi;

  const randomNumber = (len: number) => Math.floor(Math.random() * len);

  const [data, setData] = useState<TypeQuoteQuotetableAPI>();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsPending(true);
    if (!loginUser) fetchLoginUser(auth.currentUser);
    // const fullUrl = `https://api.quotable.io/random didnt work properly
    const fullUrl = `https://api.quotable.io/quotes?tags=${
      tag === "random" ? "famousQuotes" : tag
    }`;
    console.log("fetch from: ", fullUrl);
    fetch(fullUrl)
      .then((response) => {
        if (!response.ok) {
          throw Error(`不具合が発生しました!! status: ${response.status}`);
        }
        return response.json();
      })
      .then((res) => {
        const len = res.results.length;
        const quote = res.results[randomNumber(len)];
        setData({
          id: quote._id,
          author: quote.author,
          content: quote.content,
          tags: quote.tags,
        } as TypeQuoteQuotetableAPI);
        console.log("len: ", len, "quote: ", quote, "res", res, "data: ", data);
        setIsPending(false);
      })
      .catch((err) => {
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
