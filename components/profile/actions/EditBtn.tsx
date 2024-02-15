
type Props = {
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};
const EditBtn = ({ setIsEditMode }: Props) => {
  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  return (
    <div
      className="rounded-sm flex-grow cursor-pointer gap-2 px-3 py-1 text-sm hover:opacity-70 dark:bg-slate-900"
      onClick={toggleEditMode}
    >
      <span className="text-xs">Edit</span>
    </div>
  );
};

export default EditBtn;
