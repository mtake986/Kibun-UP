import { TypeQuote } from "@/types/type";

import { useState } from "react";
import Content from "./content/Content";
import Icons from "./Icons/Icons";
import EditModeOn from "./content/EditModeOn";
import LoadingSpinner from "../utils/LoadingSpinner";

type Props = {
  q: TypeQuote;
};

const QuoteCard = ({ q }: Props) => {
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="rounded-md border px-4 py-6 dark:border-white sm:p-6">
      {isLoading ? (
        <LoadingSpinner scale={48} />
      ) : isUpdateMode ? (
        <EditModeOn
          q={q}
          setIsUpdateMode={setIsUpdateMode}
          setIsLoading={setIsLoading}
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

    // <div className="rounded-sm border px-4 py-6 dark:border-white sm:p-6">
    //   {isLoading ? (
    //     <LoadingSpinner scale={48} />
    //   ) : isUpdateMode ? (
    //     <EditModeOn
    //       event={event}
    //       setIsUpdateMode={setIsUpdateMode}
    //       setIsLoading={setIsLoading}
    //     />
    //   ) : (
    //     <Content event={event} />
    //   )}

    //   <Icons
    //     event={event}
    //     setIsUpdateMode={setIsUpdateMode}
    //     isUpdateMode={isUpdateMode}
    //   />
    // </div>;
