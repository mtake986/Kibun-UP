import React, { useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/context/AuthContext";
import { useQuote } from "@/context/QuoteContext";
import useFetchTags from "@/components/hooks/useFetchTags";
import Radio from "./Radio";
import GoogleLoginBtn from "@/components/utils/GoogleLoginBtn";
import LoadingSpinnerL from "@/components/utils/LoadingSpinnerL";

const radios = [
  {
    id: "mine",
    label: "Mine",
  },
  {
    id: "bookmarks",
    label: "Bookmarks",
  },
  {
    id: "appChoice",
    label: "App Choice",
  },
];

const Radios = () => {
  const { updateQuoteTypeForHome, loginUser } =
    useAuth();
  const { getLoginUserQuotes, loginUserQuotes } = useQuote();

  useEffect(() => {
    // if (!loginUserQuotes) getLoginUserQuotes();
  }, [loginUserQuotes]);


  if (loginUser) {
    return (
      <RadioGroup
        defaultValue={loginUser.settings.quoteTypeForHome}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 sm:py-2"
      >
        {radios.map((radio) => (
          <Radio
            key={radio.id}
            radio={radio}
            updateQuoteTypeForHome={updateQuoteTypeForHome}
            loginUser={loginUser}
            loginUserQuotes={loginUserQuotes}
          />
        ))}
      </RadioGroup>
    );
  } else
    return (
      <div>
        <GoogleLoginBtn />
        <p>Please log in to view this content.</p>
      </div>
    );
};

export default Radios;
