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
import { TypeLoginUser } from "@/types/type";

type Props = {
  loginUser: TypeLoginUser;
};
const SwitchTab = ({ loginUser }: Props) => {
  const [user] = useAuthState(auth);

  const {
    loginUserQuotes,
    getLoginUserQuotes,
    quotesNotMine,
    getLockedQuote,
    whichList,
    handleWhichList,
    lockedQuote,
    getQuotesNotMine,
  } = useQuote();

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

      {whichList === "yours" ? (
        <List quotes={loginUserQuotes} />
      ) : (
        <ListNotMine quotes={quotesNotMine} />
      )}
    </div>
  );
};

const tabs: { name: "all" | "yours"; label: string }[] = [
  {
    name: "yours",
    label: "Mine",
  },
  { name: "all", label: "All" },
];

export default SwitchTab;
