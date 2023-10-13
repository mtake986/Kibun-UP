import { TypeQuote } from "@/types/type";
import Content from "./card/Content";
import Icons from "./card/Icons";
import { useState } from "react";
import EditModeOn from "./EditModeOn";

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
      <Icons
        q={q}
        setIsUpdateMode={setIsUpdateMode}
        isUpdateMode={isUpdateMode}
      />
    </div>
  );
};

export default QuoteCard;
