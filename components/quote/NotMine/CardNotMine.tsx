
import { TypeQuote } from "@/types/type";
import Icons from "./card/Icons";
import Content from "./card/Content";

type Props = {
  q: TypeQuote;
  i: number;
};
const CardNotMine = ({ q, i }: Props) => {

  return (
    <div className="mb-3 rounded-sm border p-4 sm:p-6">
      <Content q={q} />
      <Icons
        q={q}
      />
    </div>
  );
};

export default CardNotMine;

// 1: add a check if user is logged in
// 2: このQuoteがfavQuotesにあるかどうかを判断する
// 3: なかったら、storeFavを実行する
// 4: あったら、myFavs.uidsにuser.uidがあるかどうかを判断する
// 5: なかったら、storeFavを実行する
// 6: あったら、removeFavを実行する

{
  /* {user &&
          (numOfFavs(
            (favQuote) =>
              favQuote.qid === q.id && favQuote.uids.includes(user.uid)
          ) ? (
            <div>true</div>
          ) : (
            <div>false</div>
          ))} */
}
