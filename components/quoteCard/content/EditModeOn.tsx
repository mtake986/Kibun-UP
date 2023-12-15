"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useAuthState } from "react-firebase-hooks/auth";
import { TypeQuote, ITag, TypeTagErrors, TypeTagError } from "@/types/type";
import { quoteSchema } from "@/form/schema";
import { Switch } from "@/components/ui/switch";
import { useQuote } from "@/context/QuoteContext";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { changeTagColor } from "@/functions/functions";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VALIDATION_STATUS, tagColors } from "@/data/CONSTANTS";
import { Separator } from "@/components/ui/separator";
import { capitalizeFirstLetter } from "@/functions/capitalizeFirstLetter";
import TagErrors from "./TagErrors";

type Props = {
  q: TypeQuote;
  setIsUpdateMode: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCardLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditModeOn({
  q,
  setIsUpdateMode,
  setIsCardLoading,
}: Props) {
  const [user] = useAuthState(auth);
  const { getLoginUserQuotes, profileUserQuotes, fetchProfileUserQuotes } = useQuote();
  const { reset } = useForm();
  const [inputTagName, setInputTagName] = useState("");
  const [inputTagColor, setInputTagColor] = useState<string>("");
  const [inputTags, setInputTags] = useState<ITag[]>(q.tags || []);
  const [tagErrors, setTagErrors] = useState<TypeTagErrors>({});

  const isAddBtnDisabled =
    inputTagName.length <= 0 ||
    inputTagName.length > 20 ||
    inputTags.length >= 5 ||
    inputTags.some((tag) => tag.name === inputTagName);
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
      // delete tagErrors["undefOrNoChars"];
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

  const removeTag = (tagName: string) => {
    setInputTags(inputTags.filter((tag) => tag.name !== tagName));
  };

  const getButtonClasses = (isDisabled: boolean) => {
    const baseClasses =
      "cursor-pointer rounded-md px-3 py-2 text-sm duration-300 ease-in";
    const enabledClasses =
      "bg-blue-50 text-blue-500 hover:bg-blue-100 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-600";
    const disabledClasses =
      "cursor-not-allowed bg-blue-50 text-blue-500 opacity-30 dark:bg-blue-700 dark:text-white";
    return `${baseClasses} ${isDisabled ? disabledClasses : enabledClasses}`;
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof quoteSchema>>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      author: q.author,
      content: q.content,
      draftStatus: q.draftStatus,
      tags: q.tags,
    },
  });

  const { handleUpdate } = useQuote();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof quoteSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // Add a new document with a generated id.
    values.tags = inputTags;
    handleUpdate(values, q.id, setIsCardLoading, user?.uid);
    fetchProfileUserQuotes(q.createdBy);
    setIsUpdateMode(false);
    reset({
      author: "",
      content: "",
      draftStatus: "Public",
    });
    setInputTags([]);
    setInputTagName("");
    setInputTagColor("");
    setTagErrors({});
    form.reset();
  }

  return (
    <Form {...form}>
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
              <FormMessage />
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
              <FormMessage />
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
            <div className="flex w-full gap-2 sm:justify-between">
              <Select
                onValueChange={(color) => {
                  setInputTagColor(color);
                }}
                value={inputTagColor}
                disabled={inputTagName.length === 0}
              >
                <SelectTrigger
                  className={`${changeTagColor(inputTagColor)} ${
                    inputTagColor ? "border-none" : null
                  } w-full`}
                >
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
                      className={`hover:opacity-100 ${changeTagColor(color)}`}
                      value={color}
                    >
                      {inputTagName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <button
                disabled={isAddBtnDisabled}
                type="button"
                onClick={() => {
                  if (validateInputTags() === VALIDATION_STATUS.PASS) addTag();
                }}
                className={getButtonClasses(isAddBtnDisabled)}
              >
                Add
              </button>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {inputTags.map((tag, i) => (
              <Badge
                key={i}
                onClick={() => removeTag(tag.name)}
                className={`cursor-pointer border-none font-light hover:opacity-70 ${changeTagColor(
                  tag.color
                )}`}
              >
                #{tag.name}
                <MdClose className="ml-1 cursor-pointer rounded-full" />
              </Badge>
            ))}
            {inputTagName && (
              <Badge
                className={`border-none font-light hover:opacity-70 ${changeTagColor(
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
            type="submit"
            className={`w-full cursor-pointer rounded-md bg-green-50 px-3 py-2 text-sm text-green-500 duration-300 ease-in hover:bg-green-100 hover:text-green-500 dark:bg-green-700 dark:text-white dark:hover:bg-green-600`}
            variant="ghost"
          >
            Save
          </Button>
          <Button
            onClick={() => setIsUpdateMode(false)}
            className={`cursor-pointer rounded-md bg-red-50 px-3 py-2 text-sm text-red-500 duration-300 ease-in hover:bg-red-100 hover:text-red-500 dark:bg-red-700 dark:text-white dark:hover:bg-red-600`}
            variant="ghost"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
