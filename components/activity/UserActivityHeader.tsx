
import { useRouter } from "next/navigation";
import React from "react";
import { MdArrowBackIosNew } from "react-icons/md";

type Props = {
  text: string
};

const UserActivityHeader = ({ text }: Props) => {
  const router = useRouter();

  const goBackBtn = () => {
    return (
      <button
        onClick={() => router.back()}
        className="m-1 flex items-center gap-2 rounded-md duration-200 hover:opacity-70"
      >
        <MdArrowBackIosNew size={20} />
      </button>
    );
  };

  return (
    <div className="relative mb-3">
      <button
        onClick={() => router.back()}
        className="m-1 flex items-center gap-2 absolute top-0 left-0 rounded-md duration-200 hover:opacity-70"
      >
        <MdArrowBackIosNew size={20} />
      </button>
      <h3 className="text-center text-xl">{text}</h3>
    </div>
  );
};

export default UserActivityHeader;
