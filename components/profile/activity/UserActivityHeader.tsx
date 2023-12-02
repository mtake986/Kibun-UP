import UrlLink from "@/components/utils/UrlLink";
import React from "react";
import { MdArrowBackIosNew } from "react-icons/md";

type Props = {
  text: string
  linkTo: string
};
const UserActivityHeader = ({ text, linkTo }: Props) => {
  const goBackBtn = () => {
    return (
      <button className="m-1 flex items-center gap-2 rounded-md duration-200 hover:opacity-70">
        <MdArrowBackIosNew size={20} />
      </button>
    );
  };

  return (
    <div className="relative mb-3">
      <UrlLink
        href={linkTo}
        clickOn={goBackBtn()}
        target="_self"
        className="absolute top-0 left-0"
      />
      <h3 className="text-center text-xl">{text}</h3>
    </div>
  );
};

export default UserActivityHeader;
