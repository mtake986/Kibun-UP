import { TypeQuote, TypeQuotesPerPage } from "@/types/type";

import { useState } from "react";
import Content from "./content/Content";
import Icons from "./Icons/Icons";
import EditModeOn from "./content/EditModeOn";
import LoadingSpinnerS from "../utils/LoadingSpinnerS";

type Props = {
  q: TypeQuote;
};

const QuoteCard = ({ q }: Props) => {
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [isCardLoading, setIsCardLoading] = useState(false);

  return (
    <div className="relative rounded-md border px-4 py-6 dark:border-white sm:p-6">
      {isCardLoading ? (
        <LoadingSpinnerS />
      ) : isUpdateMode ? (
        <EditModeOn
          q={q}
          setIsUpdateMode={setIsUpdateMode}
          setIsCardLoading={setIsCardLoading}
        />
      ) : (
        <Content q={q} />
      )}

      <Icons
        q={q}
        setIsUpdateMode={setIsUpdateMode}
        isUpdateMode={isUpdateMode}
      />
    </div>
  );
};

export default QuoteCard;
