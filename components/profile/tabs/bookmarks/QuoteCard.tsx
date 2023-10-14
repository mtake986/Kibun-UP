import { TypeQuote } from "@/types/type";
import Content from "./card/Content";
import Icons from "./card/Icons";

type Props = {
  q: TypeQuote;
};

const QuoteCard = ({ q }: Props) => {
  return (
    <div className="mb-3 rounded-sm border p-4 sm:p-6">
      <Content q={q} />
      <Icons q={q} />
    </div>
  );
};

export default QuoteCard;
