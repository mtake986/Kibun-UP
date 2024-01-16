import { Badge } from "@/components/ui/badge";
import { changeTagColor } from "@/functions/functions";
import { BsChatLeftText, BsFillPersonFill } from "react-icons/bs";
import { TypeAPIQuote, TypeSelectedAuthors } from "@/types/type";
import { Checkbox } from "@/components/ui/checkbox";
import { twMerge } from "tailwind-merge";
import Tags from "@/components/utils/Tags";

type Props = {
  q: TypeAPIQuote;
  selectedAuthors: TypeSelectedAuthors[];
  handleAuthors: (value: TypeSelectedAuthors) => void;
};

const Content = ({ q, selectedAuthors, handleAuthors }: Props) => {
  return (
    <div className="flex flex-col gap-3 text-sm">
      <div className="flex items-center">
        <div className="flex w-10">
          <BsChatLeftText size={16} className="mr-5" />
        </div>
        <p>{q.content}</p>
      </div>
      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center">
          <div className="flex w-10">
            <BsFillPersonFill size={16} className="mr-5" />
          </div>
          <p>{q.author}</p>
        </div>

        <Checkbox
          id={q.authorSlug}
          onClick={() => {
            const payload: TypeSelectedAuthors = {
              label: q.author,
              slug: q.authorSlug,
            };
            handleAuthors(payload);
          }}
          checked={selectedAuthors.some((a) => a.label === q.author)}
        />
      </div>
      {q.tags ? <Tags tags={q.tags} /> : null}
    </div>
  );
};

export default Content;
