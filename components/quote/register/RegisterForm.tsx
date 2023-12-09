"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { auth } from "@/config/Firebase";
import { quoteSchema } from "@/form/schema";
import { useQuote } from "@/context/QuoteContext";
import {
  TypeTagErrors,
  ITag,
  TypeTagError,
  TypeUserFromFirestore,
} from "@/types/type";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { MdClose } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VALIDATION_STATUS, tagColors } from "@/data/CONSTANTS";
import { changeTagColor } from "@/functions/functions";
import HeadingTwo from "@/components/utils/HeadingTwo";
import UrlLink from "@/components/utils/UrlLink";
import { Separator } from "@/components/ui/separator";
import { capitalizeFirstLetter } from "@/functions/capitalizeFirstLetter";
import TagErrors from "@/components/quoteCard/content/TagErrors";
import { useAuth } from "@/context/AuthContext";
import { displayErrorToast } from "@/functions/displayToast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function RegisterForm() {
  const { loginUser, fetchLoginUser } = useAuth();
  const { registerQuote, toggleRegisterFormOpen } = useQuote();
  const [inputTagName, setInputTagName] = useState("");
  const [inputTagColor, setInputTagColor] = useState<string>("");
  const [inputTags, setInputTags] = useState<ITag[]>([]);
  const [tagErrors, setTagErrors] = useState<TypeTagErrors>({});
  const isAddBtnDisabled =
    inputTagName.length <= 0 ||
    inputTagName.length > 20 ||
    inputTags.length >= 5 ||
    inputTags.some((tag) => tag.name === inputTagName);

  useEffect(() => {
    if (auth.currentUser) {
      if (!loginUser) fetchLoginUser(auth.currentUser);
    }
  }, [auth.currentUser, loginUser, fetchLoginUser]);

  const validateInputTags = (): string => {
    if (inputTags.length === 5) {
      const error: TypeTagError = {
        message: "Maximum 5 tags",
      };
      setTagErrors({ ...tagErrors, over5tags: error });
      return VALIDATION_STATUS.FAIL;
    } else {
      setTagErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors["over5tags"];
        return newErrors;
      });
    }
    if (!inputTagName || inputTagName.length <= 0) {
      const error: TypeTagError = {
        message: "Tag name is required",
      };
      setTagErrors({ ...tagErrors, undefOrNoChars: error });
      return VALIDATION_STATUS.FAIL;
    } else {
      setTagErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors["undefOrNoChars"];
        return newErrors;
      });
    }
    if (inputTagName.length > 20) {
      const error: TypeTagError = {
        message: "Max. 20 characters",
      };
      setTagErrors({ ...tagErrors, over20chars: error });
      return VALIDATION_STATUS.FAIL;
    } else {
      setTagErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors["over20chars"];
        return newErrors;
      });
    }
    if (inputTags.map((tag) => tag.name).includes(inputTagName)) {
      const error: TypeTagError = {
        message: "Not Allowed The Same Tag",
      };
      setTagErrors({ ...tagErrors, sameTagName: error });
      return VALIDATION_STATUS.FAIL;
    } else {
      setTagErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors["sameTagName"];
        return newErrors;
      });
    }
    return VALIDATION_STATUS.PASS;
  };

  const addTag = () => {
    const defaultColor = "white";
    setInputTags([
      ...inputTags,
      { name: inputTagName, color: inputTagColor || defaultColor },
    ]);
    setInputTagName("");
    setInputTagColor("");
  };
  const removeTag = (inputTagName: string) => {
    setInputTags(inputTags.filter((tag) => tag.name !== inputTagName));
  };
  const getAddButtonClass = (isDisabled: boolean) => {
    return isDisabled
      ? "cursor-not-allowed rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-500 dark:bg-gray-700 dark:text-white"
      : "cursor-pointer rounded-md bg-blue-50 px-3 py-2 text-sm text-blue-500 duration-300 ease-in hover:bg-blue-100 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-600";
  };

  const { reset } = useForm();
  // 1. Define your form.
  const form = useForm<z.infer<typeof quoteSchema>>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      author: "",
      content: "",
      draftStatus: "Public",
      tags: [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof quoteSchema>) {
    if (loginUser) {
      values.tags = inputTags;
      registerQuote(values, loginUser.uid);
      reset({
        author: "",
        content: "",
        draftStatus: "Public",
        tags: [],
      });
      form.reset();
      setInputTags([]);
      setInputTagName("");
      setInputTagColor("");
      setTagErrors({});
    } else {
      displayErrorToast("Please log in.");
    }
  }

  return (
    <div className="px-5 pb-20 pt-10 sm:mb-32 sm:p-0">
      <Form {...form}>
        <HeadingTwo text="Register Form" />
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="w-full space-y-0">
                <FormLabel>
                  Content <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex.) Just Do It"
                    {...field}
                    // defaultValue={field.value}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem className="w-full space-y-0">
                <FormLabel>
                  Author <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ex.) NIKE" {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="draftStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Draft Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={"Public"}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Public">Public</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div>
            <FormLabel>Tags</FormLabel>
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-5">
              <Input
                maxLength={20}
                placeholder={
                  inputTags.length >= 5 ? "Max. 5 tags" : "Ex.) Motivation"
                }
                value={inputTagName}
                onChange={(e) =>
                  setInputTagName(capitalizeFirstLetter(e.target.value))
                }
                disabled={inputTags.length >= 5}
              />
              <div className="flex w-full gap-2 sm:justify-between sm:gap-2">
                <Select
                  onValueChange={(color) => {
                    setInputTagColor(color);
                  }}
                  disabled={inputTagName.length === 0}
                  defaultValue="white"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Ex.) Color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      disabled={true}
                      key="inputTagColor"
                      value="inputTagColor"
                    >
                      Tag color
                    </SelectItem>
                    <Separator />
                    {tagColors.map((color) => (
                      <SelectItem
                        key={color}
                        className={`${changeTagColor(color)}`}
                        value={color}
                        placeholder="Ex.) Color"
                      >
                        {inputTagName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  onClick={() => {
                    if (validateInputTags() === "pass") addTag();
                  }}
                  disabled={isAddBtnDisabled}
                  className={getAddButtonClass(isAddBtnDisabled)}
                >
                  Add
                </Button>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {inputTags.map((tag, i) => (
                <Badge
                  key={i}
                  onClick={() => removeTag(tag.name)}
                  className={`cursor-pointer border-none font-light ${changeTagColor(
                    tag.color
                  )}`}
                >
                  #{tag.name}
                  <MdClose className="ml-1 cursor-pointer rounded-full" />
                </Badge>
              ))}
              {inputTagName && (
                <Badge
                  className={` border-none font-light hover:opacity-70 ${changeTagColor(
                    inputTagColor
                  )}`}
                >
                  #{inputTagName}
                </Badge>
              )}
            </div>
            <TagErrors tagErrors={tagErrors} />
          </div>

          <div className="flex items-center gap-3">
            <Button
              className="w-full bg-green-50 text-green-500 duration-300 ease-in hover:bg-green-100 dark:bg-green-700 dark:text-white dark:hover:bg-green-600"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              Submit
            </Button>
            <UrlLink
              clickOn={
                <CloseBtn
                  toggleRegisterFormOpen={toggleRegisterFormOpen}
                  form={form}
                  loginUser={loginUser}
                />
              }
              href="/quote"
              target="_self"
            />
          </div>
        </form>
      </Form>
    </div>
  );
}

const CloseBtn = ({
  toggleRegisterFormOpen,
  form,
  loginUser,
}: {
  toggleRegisterFormOpen: () => void;
  form: UseFormReturn<
    {
      content: string;
      author: string;
      draftStatus: string;
      tags: {
        color: string;
        name: string;
      }[];
    },
    any,
    undefined
  >;
  loginUser: TypeUserFromFirestore | undefined;
}) => {
  return (
    <Button
      onClick={toggleRegisterFormOpen}
      className="w-full bg-red-50 text-red-500 duration-300 ease-in hover:bg-red-100 dark:bg-red-700 dark:text-white dark:hover:bg-red-600"
      disabled={form.formState.isSubmitting}
    >
      Close
    </Button>
  );
};
