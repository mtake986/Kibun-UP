import { Badge } from "@/components/ui/badge";
import { changeTagColor } from "@/functions/functions";
import {
  BsChatLeftText,
  BsFillPersonFill,
} from "react-icons/bs";
import {
  TypeAPIQuote,
  TypeLikedAuthorsOfAPI,
  TypeLoginUser,
  TypeSelectedAuthors,
} from "@/types/type";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart } from "lucide-react";
import useAuthorsOfAPI from "@/components/hooks/useAuthorsOfAPI";


type Props = {
  q: TypeAPIQuote;
  selectedAuthors: TypeSelectedAuthors[];
  handleAuthors: (value: TypeSelectedAuthors) => void;
  likedAuthorsOfAPI: TypeLikedAuthorsOfAPI | undefined;
  loginUser: TypeLoginUser;
};

const Content = ({
  q,
  selectedAuthors,
  handleAuthors,
  likedAuthorsOfAPI,
  loginUser,
}: Props) => {
  const { likeAuthor, removeLikeFromAuthor } = useAuthorsOfAPI();

  const isAuthorLiked =
    loginUser &&
    likedAuthorsOfAPI?.likedAuthors.includes(q.authorSlug)

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
        <div className="flex items-center gap-3">
          {isAuthorLiked ? (
            <>
              <Heart
                size={14}
                className="cursor-pointer text-red-500 ease-in hover:opacity-70"
                fill={"red"}
                onClick={() => {
                  removeLikeFromAuthor(loginUser.uid, q.authorSlug);
                }}
              />
              {/* <span className={`text-red-500`}>{numOfLikes}</span> */}
            </>
          ) : (
            <>
              <Heart
                size={14}
                onClick={() => {
                  likeAuthor(loginUser.uid, q.authorSlug);
                }}
                className="cursor-pointer ease-in hover:opacity-70"
              />
              {/* <span>{numOfLikes}</span> */}
            </>
          )}
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
