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
import { tagColors } from "@/data/CONSTANTS";
import { Separator } from "@/components/ui/separator";
import { capitalizeFirstLetter } from "@/functions/capitalizeFirstLetter";
import TagErrors from "./TagErrors";

type Props = {
  q: TypeQuote;
  setIsUpdateMode: (boo: boolean) => void;
};

export default function EditModeOn({ q, setIsUpdateMode }: Props) {
  const [user] = useAuthState(auth);
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
      return "fail";
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
      return "fail";
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
      return "fail";
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
      return "fail";
    } else {
      setTagErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors["sameTagName"];
        return newErrors;
      });
    }
    return "fine";
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

  // 1. Define your form.
  const form = useForm<z.infer<typeof quoteSchema>>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      author: q.author,
      content: q.content,
      isDraft: q.isDraft,
      tags: [],
    },
  });

  const { handleUpdate } = useQuote();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof quoteSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // Add a new document with a generated id.
    values.tags = inputTags;
    handleUpdate(q.id, values, user?.uid);
    setIsUpdateMode(false);
    reset({
      author: "",
      content: "",
      isDraft: false,
    });
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
          name="isDraft"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <FormLabel className="text-base">Draft</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
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
                      className={`hover:opacity-100 ${changeTagColor(color)}`}
                      value={color}
                    >
                      {inputTagName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                disabled={isAddBtnDisabled}
                type="button"
                onClick={() => {
                  if (validateInputTags() === "fine") addTag();
                }}
                className={`${
                  isAddBtnDisabled ? "cursor-not-allowed" : "cursor-pointer"
                } bg-blue-50 text-blue-500 duration-300 hover:bg-blue-50 hover:text-blue-500 hover:opacity-70 dark:bg-slate-700 dark:text-white`}
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
            className={`flex w-full items-center gap-2 bg-emerald-50 text-emerald-500 duration-300 hover:bg-emerald-50 hover:text-emerald-500 hover:opacity-70 dark:bg-violet-700 dark:text-white`}
            variant="ghost"
          >
            Save
          </Button>
          <Button
            onClick={() => setIsUpdateMode(false)}
            className={`flex items-center gap-2 bg-red-50 text-red-500 duration-300 hover:bg-red-50 hover:text-red-500 hover:opacity-70 dark:bg-red-900 dark:text-white`}
            variant="ghost"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
