import { auth } from "@/config/Firebase";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import GoogleLoginBtn from "@/components/utils/GoogleLoginBtn";
import { useQuote } from "@/context/QuoteContext";
import ListNotMine from "./notMine/ListNotMine";
import List from "./mine/List";

const SwitchTab = () => {
  const [user] = useAuthState(auth);

  const [loading, setLoading] = useState<boolean>(false);

  const {
    loginUserQuotes,
    getLoginUserQuotes,
    quotesNotMine,
    getQuotesNotMine,
    getLockedQuote,

    whichList,
    handleWhichList,
  } = useQuote();

  useEffect(() => {
    setLoading(true);
    getLoginUserQuotes();
    getQuotesNotMine();
    getLockedQuote();
    setLoading(false);
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

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
        user ? (
          <List quotes={loginUserQuotes} />
        ) : (
          <GoogleLoginBtn />
        )
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
