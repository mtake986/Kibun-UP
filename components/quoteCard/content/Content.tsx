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
import { twMerge } from "tailwind-merge";

type Props = {
  q: TypeQuote;
};

type InfoProps = {
  icon: React.ReactNode;
  text: string;
};
const Info: React.FC<InfoProps> = ({ icon, text }) => (
  <div className="flex items-center">
    <div className="mr-2 flex h-4 w-4">{icon}</div>
    <p>{text}</p>
  </div>
);

const Content = ({ q }: Props) => {
  return (
    <div className="flex flex-col gap-3 text-sm">
      <Info icon={<BsChatLeftText size={16} />} text={q.content} />
      <Info icon={<BsFillPersonFill size={16} />} text={q.author} />
      <Info icon={<EyeIcon size={16} />} text={q.draftStatus} />
      {q.tags && q.tags?.length >= 1 && (
        <div className="flex flex-wrap items-center gap-2">
          {q.tags.map((tag, i) => (
            <Badge
              key={tag.name}
              className={twMerge(
                "border-none font-light",
                changeTagColor(tag.color)
              )}
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
