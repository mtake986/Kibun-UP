import {
  TypeAPIQuote,
  TypeLikedAuthorsOfAPI,
  TypeLoginUser,
  TypeSelectedAuthors,
} from "@/types/type";

import Content from "./content/Content";
import Icons from "./Icons/Icons";

type Props = {
  q: TypeAPIQuote;
  selectedAuthors: TypeSelectedAuthors[];
  handleAuthors: (value: TypeSelectedAuthors) => void;
};

const ApiQuoteCard = ({
  q,
  selectedAuthors,
  handleAuthors,
}: Props) => {
  return (
    <div className="relative rounded-md border px-4 py-6 dark:border-white sm:p-6">
      <Content
        q={q}
        selectedAuthors={selectedAuthors}
        handleAuthors={handleAuthors}
      />

      <Icons q={q} />
    </div>
  );
};

export default ApiQuoteCard;
