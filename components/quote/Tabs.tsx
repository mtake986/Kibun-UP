import { auth } from "@/config/Firebase";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import GoogleLoginBtn from "@/components/utils/GoogleLoginBtn";
import { useQuote } from "@/context/QuoteContext";
import ListNotMine from "./notMine/ListNotMine";
import List from "./mine/List";
import { displayErrorToast } from "@/functions/displayToast";
import { useAuth } from "@/context/AuthContext";
import LoadingIndicator from "../home/LoadingIndicator";
import { TypeLoginUser, TypeQuote, typeTabNamesOfQuotes } from "@/types/type";
import ListOfRandom from "./random/ListOfRandom";
import useQuotesFromQuotableAPI from "../hooks/useQuotesFromQuotableAPI";

type Props = {
  loginUser: TypeLoginUser;
};
const SwitchTab = ({ loginUser }: Props) => {
  const [user] = useAuthState(auth);

  const { loginUserQuotes, quotesNotMine, whichList, handleWhichList } =
    useQuote();

  const { data, isPending, error, refetch } = useQuotesFromQuotableAPI();

  if (data) {
    return (
      <div>
        <div className="mb-3 flex items-stretch">
          {tabs.map((tab) => (
            <span
              key={tab.name}
              className={`w-full cursor-pointer py-1 text-center text-xs sm:text-sm ${
                whichList === tab.name
                  ? "rounded-2xl bg-violet-50 text-violet-500 dark:bg-slate-900 dark:text-white"
                  : ""
              }`}
              onClick={() => handleWhichList(tab.name)}
            >
              {tab.label}
            </span>
          ))}
        </div>

        {whichList === "mine" ? (
          <List quotes={loginUserQuotes} />
        ) : whichList === "all" ? (
          <ListNotMine quotes={quotesNotMine} />
        ) : (
          <ListOfRandom quotes={data} />
        )}
      </div>
    );
  }
  return <div>Something is off</div>;
};

const tabs: { name: typeTabNamesOfQuotes; label: string }[] = [
  {
    name: "mine",
    label: "Mine",
  },
  { name: "all", label: "All" },
  { name: "api", label: "Random" },
];

export default SwitchTab;
