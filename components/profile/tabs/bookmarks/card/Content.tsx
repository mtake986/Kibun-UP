import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { changeTagColor } from "@/functions/functions";
import { TypeQuote } from "@/types/type";
import {
  BsFillPersonFill,
  BsChatLeftText,
  BsToggle2Off,
  BsToggle2On,
} from "react-icons/bs";

type Props = {
  q: TypeQuote;
}
const Content = ({q}: Props) => {

  const {loginUser} = useAuth();

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
      {q.userInfo?.uid === loginUser?.uid ? (
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
      ) : null}
      {q.tags && q.tags?.length >= 1 && (
        <div className="flex flex-wrap items-center gap-2">
          {q.tags.map((tag, i) => (
            <Badge
              key={i}
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
}

export default Content