import { Badge } from "@/components/ui/badge";
import { changeTagColor } from "@/functions/functions";
import { TypeQuote } from "@/types/type";

import { BsFillPersonFill, BsChatLeftText } from "react-icons/bs";

type Props = {
  q: TypeQuote;
};
const Content = ({ q }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center">
        <div className="flex w-10">
          <BsChatLeftText size={20} className="mr-5" />
        </div>
        <p>{q.quote}</p>
      </div>
      <div className="flex items-center">
        <div className="flex w-10">
          <BsFillPersonFill size={20} className="mr-5" />
        </div>
        <p>{q.person}</p>
      </div>
      {q?.tags && q.tags?.length >= 1 && (
        <div className="flex flex-wrap items-center gap-2">
          {q.tags.map((tag, i) => (
            <Badge
              key={i + "-" + tag.tag}
              className={`border-none font-light ${changeTagColor(
                tag.tagColor
              )}`}
            >
              #{tag.tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default Content;
