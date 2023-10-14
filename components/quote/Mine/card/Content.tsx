
import { Badge } from "@/components/ui/badge";
import { changeTagColor } from "@/functions/functions";
import {
  BsChatLeftText,
  BsFillPersonFill,
  BsToggle2Off,
  BsToggle2On,
} from "react-icons/bs";
import { TypeQuote } from "@/types/type";

type Props = {
  q: TypeQuote;
};
const Content = ({ q }: Props ) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center">
        <div className="flex w-10">
          <BsChatLeftText size={20} className="mr-5" />
        </div>
        <p className="">{q.quote}</p>
      </div>
      <div className="flex items-center">
        <div className="flex w-10">
          <BsFillPersonFill size={20} className="mr-5" />
        </div>
        <p className="">{q.person}</p>
      </div>
      <div className="flex items-center">
        {q.isDraft ? (
          <>
            <div className="flex w-10">
              <BsToggle2Off size={20} className="mr-5" />
            </div>
            <p>Draft</p>
          </>
        ) : (
          <>
            <div className="flex w-10">
              <BsToggle2On size={20} className="mr-5" />
            </div>
            <p>Public</p>
          </>
        )}
      </div>
      {q.tags && q.tags?.length >= 1 && (
        <div className="flex flex-wrap items-center gap-2">
          {q.tags.map((tag, i) => (
            <Badge
              key={tag.tag}
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
