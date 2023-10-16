import { Badge } from "@/components/ui/badge";
import { changeTagColor } from "@/functions/functions";
import {
  BsChatLeftText,
  BsFillPersonFill,
  BsToggle2Off,
  BsToggle2On,
} from "react-icons/bs";
import { TypeQuote, TypeQuoteQuotetableAPI } from "@/types/type";

type Props = {
  q: TypeQuote | TypeQuoteQuotetableAPI;
};
const Content = ({ q }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center">
        <div className="flex w-10">
          <BsChatLeftText size={20} className="mr-5" />
        </div>
        <p className="">{q ? ("quote" in q ? q.quote : q.content) : null}</p>
      </div>
      <div className="flex items-center">
        <div className="flex w-10">
          <BsFillPersonFill size={20} className="mr-5" />
        </div>
        <p className="">{q ? ("person" in q ? q.person : q.author) : null}</p>
      </div>
      <div className="flex items-center">
        {q ? (
          "isDraft" in q ? (
            q.isDraft ? (
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
            )
          ) : null
        ) : null}
      </div>
      {/* {q.tags && q.tags?.length >= 1 && (
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
      )} */}
      <ul className="flex flex-wrap items-center gap-1 text-[10px]">
        {q
          ? "content" in q
            ? q.tags.map((tag, i) => (
                <Badge
                  key={i}
                  className={`whitespace-nowrap font-light hover:opacity-70 ${changeTagColor(
                    "gray"
                  )}`}
                >
                  #{tag}
                </Badge>
              ))
            : Object.keys(q).includes("tags")
            ? q.tags.map((tag, i) => (
                <Badge
                  key={i}
                  className={`font-light hover:opacity-70 ${changeTagColor(
                    tag.tagColor
                  )}`}
                >
                  #{tag.tag}
                </Badge>
              ))
            : null
          : null}
      </ul>
    </div>
  );
};

export default Content;
