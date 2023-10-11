
export function getRandomNum(max: number) {
  return Math.floor(Math.random() * max);
}

export const changeTagColor = (tagColor: string) => {
  if (tagColor === "red")
    return "bg-red-50 text-red-500 hover:bg-red-50 hover:text-red-500";
  else if (tagColor === "orange")
    return "bg-orange-50 text-orange-500 hover:bg-orange-50 hover:text-orange-500";
  else if (tagColor === "green")
    return "bg-green-50 text-green-500 hover:bg-green-50 hover:text-green-500";
  else if (tagColor === "blue")
    return "bg-blue-50 text-blue-500 hover:bg-blue-50 hover:text-blue-500";
  else if (tagColor === "violet")
    return "bg-violet-50 text-violet-500 hover:bg-violet-50 hover:text-violet-500";
  else return "bg-white text-black hover:bg-white hover:text-black";
};

  export function calculateLeftDays(date: Date): number {
    const today = new Date();
    if (date < today) {
      return -1;
    } else {
      const diffTime = Math.abs(date.getTime() - today.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;
      // setLeftDays(diffDays);
      return diffDays + 1;
    }
  }
