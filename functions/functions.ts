import { TypeTagsQuotableAPI } from "@/types/type";

export function getRandomNum(max: number) {
  if (max === 0) return 0;
  return Math.floor(Math.random() * max);
}
const colorMap: { [key: string]: string } = {
  red: "bg-red-50 text-red-500 hover:bg-red-50 hover:text-red-500",
  orange:
    "bg-orange-50 text-orange-500 hover:bg-orange-50 hover:text-orange-500",
  green: "bg-green-50 text-green-500 hover:bg-green-50 hover:text-green-500",
  blue: "bg-blue-50 text-blue-500 hover:bg-blue-50 hover:text-blue-500",
  violet:
    "bg-violet-50 text-violet-500 hover:bg-violet-50 hover:text-violet-500",
};
export const changeTagColor = (tagColor: string) => {
  return (
    colorMap[tagColor] || "bg-white text-black hover:bg-white hover:text-black"
  );
};

export function calculateLeftDays(date: Date): number {
  const today = new Date();
  const diffTime = date.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function removeDuplicates(tags: TypeTagsQuotableAPI[]): TypeTagsQuotableAPI[] {
  let tagNames: Set<string> = new Set();
  return tags.filter((tag: TypeTagsQuotableAPI) => {
    if (!tagNames.has(tag.name)) {
      tagNames.add(tag.name);
      return true;
    }
    return false;
  });
}
