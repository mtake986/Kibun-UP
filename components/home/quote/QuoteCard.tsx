
import QuoteContent from "./QuoteContent";
import { TypeLoginUser, TypeQuote } from "@/types/type";
import AuthorText from "./AuthorText";
import Icons from "./Icons";
import Tags from "./Tags";

type Props = {
  quote: TypeQuote;
  type: "locked" | "appChoice" | "notAppChoice";
  refetch?: () => void;
  isPending?: boolean;
  loginUser: TypeLoginUser;
};
const QuoteCard = ({ quote, type, refetch, isPending, loginUser }: Props) => {
  return (
    <div className="mb-20 p-6 sm:rounded-lg sm:p-12 sm:shadow">
      <QuoteContent quote={quote} />
      <AuthorText quote={quote} />
      <div className="mt-3 flex items-start justify-between">
        <Tags quote={quote} />
        <Icons
          quote={quote}
          type={type}
          refetch={refetch}
          loginUser={loginUser}
        />
      </div>
    </div>
  );
};

export default QuoteCard;
