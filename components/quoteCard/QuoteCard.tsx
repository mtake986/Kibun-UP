import { TypeQuote } from "@/types/type";

import { useState } from "react";
import Content from "./content/Content";
import Icons from "./Icons/Icons";
import EditModeOn from "./content/EditModeOn";

type Props = {
  q: TypeQuote;
};

const QuoteCard = ({ q }: Props) => {
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  // if (q.userInfo.uid !== user?.uid && q.isDraft) return null;

  return (
    <div className="mb-3 rounded-sm border p-4 sm:p-6">
      {isUpdateMode ? (
        <EditModeOn q={q} setIsUpdateMode={setIsUpdateMode} />
      ) : (
        <Content q={q} />
      )}
      <Icons q={q} setIsUpdateMode={setIsUpdateMode} />
    </div>
  );
};

export default QuoteCard;
