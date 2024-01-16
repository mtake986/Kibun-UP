import { Badge } from "@/components/ui/badge";
import { changeTagColor } from "@/functions/functions";
import {
  BsChatLeftText,
  BsFillPersonFill,
} from "react-icons/bs";
import { TypeQuote } from "@/types/type";
import { EyeIcon, EyeOff } from "lucide-react";
import { twMerge } from "tailwind-merge";
import Tags from "@/components/utils/Tags";

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
      {q.tags ? (
        <Tags tags={q.tags} />
      ) : null}
    </div>
  );
};

export default Content;
