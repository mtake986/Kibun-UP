import QuoteContent from "./QuoteContent";
import { TypeLoginUser, TypeQuote } from "@/types/type";
import AuthorText from "./AuthorText";
import Icons from "./Icons";
import Tags from "./Tags";

type Props = {
  quote: TypeQuote;
  type: "locked" | "appChoice" | "notAppChoice";
  refetch?: () => void;
  loginUser: TypeLoginUser;
};
const QuoteCard = ({ quote, type, refetch, loginUser }: Props) => {
  return (
    <div className="mb-20 p-6 flex flex-col gap-1 sm:rounded-lg sm:p-12 sm:shadow">
      <QuoteContent quote={quote} />
      <AuthorText quote={quote} />
      <Tags quote={quote} />
      <Icons
        quote={quote}
        type={type}
        refetch={refetch}
        loginUser={loginUser}
      />
    </div>
  );
};

export default QuoteCard;
