import { Badge } from "@/components/ui/badge";
import { changeTagColor } from "@/functions/functions";
import {
  BsChatLeftText,
  BsFillPersonFill,
  BsToggle2Off,
  BsToggle2On,
} from "react-icons/bs";
import { TypeQuote } from "@/types/type";
import { EyeIcon, EyeOff } from "lucide-react";

type Props = {
  q: TypeQuote;
};

const Content = ({ q }: Props) => {
  return (
    <div className="flex flex-col gap-3 text-sm">
      <div className="flex items-center">
        <div className="flex w-10">
          <BsChatLeftText size={16} className="mr-5" />
        </div>
        <p>{q.content}</p>
      </div>
      <div className="flex items-center">
        <div className="flex w-10">
          <BsFillPersonFill size={16} className="mr-5" />
        </div>
        <p>{q.author}</p>
      </div>
      <div className="flex items-center">
        <div className="flex w-10">
          <EyeIcon size={16} className="mr-5" />
        </div>
        <p>{q.draftStatus}</p>
      </div>
      {q.tags && q.tags?.length >= 1 && (
        <div className="flex flex-wrap items-center gap-2">
          {q.tags.map((tag, i) => (
            <Badge
              key={tag.name}
              className={`border-none font-light ${changeTagColor(tag.color)}`}
            >
              #{tag.name}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default Content;
