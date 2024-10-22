
import { useEvent } from "@/context/EventContext";
import { displayErrorToast } from "@/functions/displayToast";
import { TypeUserFromFirestore, TypeEvent } from "@/types/type";
import { Heart, Megaphone } from "lucide-react";
import { useState } from "react";
import { BsMegaphone } from "react-icons/bs";
import { PiHandsClappingBold } from "react-icons/pi";

type Props = {
  event: TypeEvent;
  loginUser: TypeUserFromFirestore;
};

const IconLike = ({ event, loginUser }: Props) => {
  const { cheerEvent, removeCheerFromEvent } = useEvent();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [numOfCheers, setNumOfCheers] = useState<number>(event.cheeredBy?.length);
  const [isCheered, setIsCheered] = useState<boolean>(event.cheeredBy?.includes(loginUser.uid));

  const handleClick = async () => {
    setIsLoading(true);
    try {
      if (isCheered) {
        setNumOfCheers(prev => prev - 1)
        setIsCheered(prev => !prev)
        await removeCheerFromEvent(loginUser.uid, event);
      } else {
        setNumOfCheers(prev => prev + 1)
        setIsCheered(prev => !prev)
        await cheerEvent(loginUser.uid, event);
      }
    } catch (error) {
      displayErrorToast(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="flex cursor-pointer items-center gap-1 duration-300 hover:opacity-70"
    >
      {isCheered ? (
        <>
          <PiHandsClappingBold size={14} className="text-emerald-500" />
          <span className="text-xs text-emerald-500">{numOfCheers}</span>
        </>
      ) : (
        <>
          <PiHandsClappingBold size={14} />
          <span className="text-xs">{numOfCheers}</span>
        </>
      )}
    </button>
  );
};

export default IconLike;
