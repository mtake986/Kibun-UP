import QuoteContent from "./QuoteContent";
import { TypeAPIQuote, TypeLoginUser, TypeQuote } from "@/types/type";
import AuthorText from "./AuthorText";
import Icons from "./Icons";
import Tags from "./Tags";

type Props = {
  quote: TypeQuote | TypeAPIQuote;
  type: "locked" | "appChoice" | "notAppChoice";
  refetch?: () => void;
  loginUser: TypeLoginUser;
};

const QuoteCard = ({ quote, type, refetch, loginUser }: Props) => {
  return (
    <div className="mb-20 p-6 flex flex-col gap-1 rounded-none sm:rounded-lg sm:p-12 sm:shadow">
      <QuoteContent content={quote.content} />
      <AuthorText author={quote.author} />
      <Tags tags={quote?.tags} />
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
