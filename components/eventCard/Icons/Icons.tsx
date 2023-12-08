import { TypeEvent } from "@/types/type";
import { useAuth } from "@/context/AuthContext";
import IconEdit from "./IconEdit";
import IconLock from "./IconLock";
import IconTrash from "./IconTrash";
import { useEffect } from "react";
import { auth } from "@/config/Firebase";
import { displayErrorToast, displayToast } from "@/functions/displayToast";

type Props = {
  event: TypeEvent;
  setIsUpdateMode: (boo: boolean) => void;
  isUpdateMode: boolean;
  goPrevAsNoCurrentRecords?: () => void;
};

const Icons = ({
  event,
  setIsUpdateMode,
  isUpdateMode,
  goPrevAsNoCurrentRecords,
}: Props) => {
  const { loginUser, fetchLoginUser } = useAuth();

  useEffect(() => {
    fetchLoginUser(auth.currentUser);
  }, []);

  if (!loginUser) {
    displayToast({ text: "No Login User", color: "red" });
    return null; // or return some default UI
  }

  return (
    <div className="mt-5 flex items-center justify-between">
      <div className="flex items-center gap-5">
        <IconEdit
          setIsUpdateMode={setIsUpdateMode}
          isUpdateMode={isUpdateMode}
        />
        <IconLock event={event} loginUser={loginUser} />
      </div>
      <IconTrash event={event} goPrevAsNoCurrentRecords={goPrevAsNoCurrentRecords} />
    </div>
  );
};

export default Icons;
