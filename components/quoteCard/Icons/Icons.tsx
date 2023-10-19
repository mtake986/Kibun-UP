import { TypeQuote } from "@/types/type";
import { useAuth } from "@/context/AuthContext";
import IconEdit from "./IconEdit";
import IconLock from "./IconLock";
import IconLike from "./IconLike";
import IconBookmark from "./IconBookmark";
import IconTrash from "./IconTrash";

type Props = {
  q: TypeQuote;
  setIsUpdateMode?: (boo: boolean) => void;
};

const Icons = ({ q, setIsUpdateMode }: Props) => {
  const { loginUser } = useAuth();

  if (!loginUser) {
    return null; // or return some default UI
  }

  const mine = q.userInfo !== 'api' && loginUser.uid === q.userInfo.uid;
  return (
    <div className="mt-5 flex items-center justify-between gap-2">
      <div className="flex items-center gap-5">
        {mine && setIsUpdateMode ? (
          <IconEdit setIsUpdateMode={setIsUpdateMode} />
        ) : null}
        <IconLock q={q} loginUser={loginUser} />
        <IconLike q={q} loginUser={loginUser} />
        <IconBookmark q={q} loginUser={loginUser} />
      </div>
      {mine ? <IconTrash q={q} /> : null}
    </div>
  );
};

export default Icons;
