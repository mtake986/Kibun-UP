import UrlLink from "@/components/utils/UrlLink";
import { TypeLoginUser } from "@/types/type";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { MdArrowBackIosNew } from "react-icons/md";

type Props = {
  loginUser: TypeLoginUser;
};
const UserActivityHeader = ({ loginUser }: Props) => {
  const goBackBtn = () => {
    return (
      <button className="m-1 flex items-center gap-2 rounded-md duration-200 hover:opacity-70">
        <MdArrowBackIosNew size={16} />
      </button>
    );
  };

  return (
    <div className="relative">
      <UrlLink
        href={`/user/profile/${loginUser?.uid}`}
        clickOn={goBackBtn()}
        target="_self"
        className="absolute top-0 left-5"
      />
      <h3 className="text-center">Your Activity</h3>
    </div>
  );
};

export default UserActivityHeader;
