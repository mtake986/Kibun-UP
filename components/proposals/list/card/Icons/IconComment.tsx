import { BiCommentAdd } from "react-icons/bi";

type Props = {
  toggleAddMode: () => void;
};

const IconComment = ({ toggleAddMode }: Props) => {
  return (
    <BiCommentAdd
      onClick={toggleAddMode}
      className="cursor-pointer duration-300 hover:opacity-70"
    />
  );
};

export default IconComment;
