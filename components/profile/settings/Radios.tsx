import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/context/AuthContext";
import { useQuote } from "@/context/QuoteContext";
import Radio from "./Radio";
import GoogleLoginBtn from "@/components/utils/GoogleLoginBtn";
import { TypeQuoteTypeForHome } from "@/types/type";

const radios: { id: TypeQuoteTypeForHome, label: string}[] = [
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
  const { updateQuoteTypeForHome, loginUser } = useAuth();
  const { loginUserQuotes } = useQuote();
  const [quoteTypeForHome, setQuoteTypeForHome] = useState<
    "bookmarks" | "appChoice" | "mine"
  >(loginUser?.settings?.quoteTypeForHome ?? 'mine');

  if (loginUser) {
    return (
      <RadioGroup
        defaultValue={loginUser.settings.quoteTypeForHome}
        className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-5 sm:py-2"
      >
        {radios.map((radio) => (
          <Radio
            key={radio.id}
            radio={radio}
            updateQuoteTypeForHome={updateQuoteTypeForHome}
            loginUser={loginUser}
            loginUserQuotes={loginUserQuotes}
            quoteTypeForHome={quoteTypeForHome}
            setQuoteTypeForHome={setQuoteTypeForHome}
          />
        ))}
      </RadioGroup>
    );
  } else return <GoogleLoginBtn />;
};

export default Radios;
