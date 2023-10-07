"use client";

import { db } from "@/config/Firebase";
import { useAuth } from "@/context/AuthContext";
import { useQuote } from "@/context/QuoteContext";
import { CategoriesQuoteFromAPI } from "@/public/CONSTANTS";
import { IQuote, typeQuoteFromAPI } from "@/types/type";
import { getRandomNum } from "@/utils/functions";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const useFetchQuoteFromNinjasAPI = () => {
  const randomNumber = Math.floor(
    Math.random() * CategoriesQuoteFromAPI.length
  );
  const randomCategory = CategoriesQuoteFromAPI[randomNumber];

  const [data, setData] = useState<any>();
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      fetch(
        `https://api.quotable.io/random`,
      )
        .then((response) => {
          if (!response.ok) {
            throw Error(`不具合が発生しました!! status: ${response.status}`);
          }
          return response.json();
        })
        .then((res) => {
          console.log(res);
          setData({
            person: res.author,
            quote: res.content,
          } as IQuote);
          setIsPending(false);
        })
        .catch((err) => {
          console.log(err.message);
          setError(err.message);
          setIsPending(false);
        });
    };
    fetchDocuments();
  }, []);

  return { data, isPending, error };
};

export default useFetchQuoteFromNinjasAPI;
