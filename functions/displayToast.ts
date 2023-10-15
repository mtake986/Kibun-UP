import { toast } from "@/components/ui/use-toast";

export const displayToast = ({
  text,
  color,
}: {
  text: string;
  color: "red" | "green" | "blue" | "black";
}) => {
  const styleMap: Record<"red" | "green" | "blue" | string, string> = {
    red: "bg-red-500 text-white",
    black: "bg-white text-black",
    blue: "bg-blue-500 text-white",
  };
  return toast({
    title: text,
    className: `border-none ${styleMap[color]}`,
  });
};
export const displaySuccessToast = ({
  text,
  color = "blue",
}: {
  text: string;
  color?: "red" | "green" | "blue";
}) => {
  displayToast({ text: text, color: color });
};

export const displayErrorToast = (
  e: unknown,
  defaultMessage = "Something wrong. Please reload and try again"
) => {
  if (typeof e === "string") {
    displayToast({
      text: e || defaultMessage,
      color: "red",
    });
  } else if (e instanceof Error) {
    displayToast({
      text: e.message || defaultMessage,
      color: "red",
    });
  } else {
    displayToast({
      text: defaultMessage,
      color: "red",
    });
  }
};