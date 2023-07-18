"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import QuoteCard from "@/components/profile/tabs/quote/QuoteCard";
import { useQuote } from "@/app/context/QuoteContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/config/Firebase";

const QuoteList = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

  const { loginUsersQuotes, getLoginUsersQuotes } = useQuote();

  useEffect(() => {
    setLoading(true);
    getLoginUsersQuotes();
    setLoading(false);
  }, []);

  if (loading) return <div>loading</div>

  if (!loading && loginUsersQuotes.length === 0) return <div>No Quotes</div>
  
  return (
    <div>
      {" "}
      {loginUsersQuotes && (
        <div>
          {loginUsersQuotes.map((q) => (
            <QuoteCard key={q.id} q={q} />
          ))}
        </div>
      )}
    </div>
  );
};

export default QuoteList;
