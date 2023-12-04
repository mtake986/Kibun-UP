import { Edit } from "lucide-react";

type Props = {
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};
const EditBtn = ({ setIsEditMode }: Props) => {
  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  return (
    <div
      className="hover:opacity-70 cursor-pointer flex-grow gap-2 bg-slate-50 px-3 py-1 dark:bg-slate-900 text-sm"
      onClick={toggleEditMode}
    >
      <span>Edit</span>
    </div>
  );
};

export default EditBtn;
