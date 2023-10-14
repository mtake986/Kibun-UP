import { toast } from "@/components/ui/use-toast";

const styleMap: { [key: string]: string } = {
  red: "bg-red-500 text-white",
  green: "bg-green-500 text-white",
  blue: "bg-blue-500 text-white",
};

export const displayToast = ({
  text,
  color,
}: {
  text: string;
  color: string;
}) => {
  return toast({
    title: text,
    className: `border-none ${styleMap[color]}`,
  });
};


export const displaySuccessToast = ({
  text,
}: {
  text: string;
}) => {
  displayToast({text: text, color: "blue"})
};

export const displayErrorToast = (e: unknown) => {
  if (typeof e === "string") {
    displayToast({
      text: e || "Something wrong. Please reload and try again",
      color: "red",
    });
  } else if (e instanceof Error) {
    displayToast({
      text: e.message || "Something wrong. Please reload and try again",
      color: "red",
    });
  }
};
