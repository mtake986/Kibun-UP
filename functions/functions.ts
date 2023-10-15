
import { TypeTagsQuotableAPI } from "@/types/type";

export function getRandomNum(max: number) {
  if (max < 0) throw new Error("Max must be non-negative");
  if (max === 0) return 0;
  return Math.floor(Math.random() * max);
}

const colorMap: { [key: string]: string } = {
  white: "text-[10px] bg-white text-black hover:bg-white hover:text-black",
  red: "text-[10px] bg-red-50 text-red-500 hover:bg-red-50 hover:text-red-500",
  orange:
    "text-[10px] bg-orange-50 text-orange-500 hover:bg-orange-50 hover:text-orange-500",
  green:
    "text-[10px] bg-green-50 text-green-500 hover:bg-green-50 hover:text-green-500",
  blue: "text-[10px] bg-blue-50 text-blue-500 hover:bg-blue-50 hover:text-blue-500",
  violet:
    "text-[10px] bg-violet-50 text-violet-500 hover:bg-violet-50 hover:text-violet-500",
  gray: "text-[10px] bg-gray-50 text-gray-500 hover:bg-gray-50 hover:text-gray-500",
};
export const changeTagColor = (tagColor: string) => {
  return (
    colorMap[tagColor] ||
    "text-[10px] bg-white text-black hover:bg-white hover:text-black"
  );
};

export function calculateLeftDays(date: Date): number {
  const today = new Date();
  // if (date.getTime() < today.getTime())
  //   throw new Error("Date must be in the future");
  const diffTime = date.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function removeDuplicates(
  tags: TypeTagsQuotableAPI[]
): TypeTagsQuotableAPI[] {
  let tagNames: Set<string> = new Set();
  return tags.filter((tag: TypeTagsQuotableAPI) => {
    if (!tagNames.has(tag.name)) {
      tagNames.add(tag.name);
      return true;
    }
    return false;
  });
}
