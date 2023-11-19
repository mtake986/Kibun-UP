import { TypeAPIQuote } from "@/types/type";
import { useAuth } from "@/context/AuthContext";
import IconLock from "./IconLock";
import IconLike from "./IconLike";
import IconBookmark from "./IconBookmark";

type Props = {
  q: TypeAPIQuote;
};

const Icons = ({ q }: Props) => {
  const { loginUser } = useAuth();

  return (
    <div className="mt-5 flex items-center justify-start gap-5">
      {loginUser ? (
        <>
          <IconLock q={q} loginUser={loginUser} />
          <IconLike q={q} loginUser={loginUser} />
          <IconBookmark q={q} loginUser={loginUser} />
        </>
      ) : (
        <p>Only for login user</p>
      )}
    </div>
  );
};

export default Icons;
