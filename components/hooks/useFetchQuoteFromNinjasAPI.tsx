"use client";

import { CategoriesQuoteFromAPI } from "@/public/CONSTANTS";
import { typeQuoteFromAPI } from "@/types/type";
import { useEffect, useState } from "react";

const useFetchQuoteFromNinjasAPI = () => {
  const randomNumber = Math.floor(Math.random() * CategoriesQuoteFromAPI.length);
  const randomCategory = CategoriesQuoteFromAPI[randomNumber];

  const [data, setData] = useState<typeQuoteFromAPI>();
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 47都道府県の一覧を取得
    // API Doc: https://opendata.resas-portal.go.jp/docs/api/v1/prefectures.html
    fetch(`https://api.api-ninjas.com/v1/quotes?category=${randomCategory}`, {
      headers: {
        "X-API-KEY": process.env.NEXT_PUBLIC_NINJAS_API_KEY || "",
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(`不具合が発生しました!! status: ${response.status}`);
        }
        return response.json();
      })
      .then((res) => {
        setData(res.result);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  }, [randomCategory]);

  return { data, isPending, error };
};

export default useFetchQuoteFromNinjasAPI;
