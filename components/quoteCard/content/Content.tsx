import { Badge } from "@/components/ui/badge";
import { changeTagColor } from "@/functions/functions";
import {
  BsChatLeftText,
  BsFillPersonFill,
  BsToggle2Off,
  BsToggle2On,
} from "react-icons/bs";
import { TypeQuote } from "@/types/type";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  q: TypeQuote;
  selectedAuthors?: string[];
  handleAuthors?: (value: string) => void;
};

const Content = ({ q, selectedAuthors, handleAuthors }: Props) => {
  return (
    <div className="flex flex-col gap-3 text-sm">
      <div className="flex items-center">
        <div className="flex w-10">
          <BsChatLeftText size={16} className="mr-5" />
        </div>
        <p className="">{q.content}</p>
      </div>
      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center">
          <div className="flex w-10">
            <BsFillPersonFill size={16} className="mr-5" />
          </div>
          <label htmlFor={q.authorSlug} className="">
            {q.author}
          </label>
        </div>
        {q?.authorSlug && handleAuthors ? (
          <Checkbox
            id={q.authorSlug}
            onClick={() => {
              q.authorSlug && handleAuthors(q.authorSlug);
            }}
            checked={selectedAuthors?.includes(q.authorSlug)}
          />
        ) : null}
      </div>
      <div className="flex items-center">
        {q.isDraft ? (
          <>
            <div className="flex w-10">
              <BsToggle2Off size={16} className="mr-5" />
            </div>
            <p>Draft</p>
          </>
        ) : (
          <>
            <div className="flex w-10">
              <BsToggle2On size={16} className="mr-5" />
            </div>
            <p>Public</p>
          </>
        )}
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
