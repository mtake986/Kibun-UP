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
import { quoteSchema } from "@/form/schema";
import { Switch } from "@/components/ui/switch";
import { useQuote } from "@/context/QuoteContext";
import { IUserInfo } from "@/types/type";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { MdClose } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tagColors } from "@/data/CONSTANTS";
import { ITag } from "@/types/type";
import { changeTagColor } from "@/functions/functions";
import HeadingTwo from "@/components/utils/HeadingTwo";
import UrlLink from "@/components/utils/UrlLink";
import { Separator } from "@/components/ui/separator";
import { capitalizeFirstLetter } from "@/functions/capitalizeFirstLetter";

export default function RegisterForm() {
  const [user] = useAuthState(auth);
  const { registerQuote, toggleRegisterFormOpen } = useQuote();
  const [inputTagName, setInputTagName] = useState("");
  const [inputTagColor, setInputTagColor] = useState<string>("");
  const [inputTags, setInputTags] = useState<ITag[]>([]);

  const addTag = (inputTagName: string) => {
    const defaultColor = "white";
    inputTagName = capitalizeFirstLetter(inputTagName);
    console.log(inputTagName)
    if (!inputTagName || inputTagName.length <= 0) {
      alert("Min. 1 character.");
    } else if (inputTagName.length > 20) {
      alert("Max. 20 characters.");
    } else if (inputTags.map((tag) => tag.name).includes(inputTagName)) {
      alert("Not Allowed The Same Tag.");
    } else if (inputTags.length === 5) {
      alert("Maximum 5 tags.");
    } else {
      setInputTags([
        ...inputTags,
        { name: inputTagName, color: inputTagColor || defaultColor },
      ]);
      setInputTagName("");
      setInputTagColor("");
    }
  };
  const removeTag = (inputTagName: string) => {
    setInputTags(inputTags.filter((tag) => tag.name !== inputTagName));
  };

  const { reset } = useForm();
  // 1. Define your form.
  const form = useForm<z.infer<typeof quoteSchema>>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      author: "",
      content: "",
      isDraft: false,
      tags: [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof quoteSchema>) {
    const userInfo: IUserInfo = {
      uid: user?.uid,
      displayName: user?.displayName,
      photoUrl: user?.photoURL,
    };
    values.tags = inputTags;
    registerQuote(values, userInfo);

    reset({
      author: "",
      content: "",
      isDraft: false,
      tags: [],
    });
    form.reset();
    setInputTags([]);
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
              <div className="flex w-full gap-2 sm:justify-between sm:gap-2">
                <Select
                  onValueChange={(color) => {
                    setInputTagColor(color);
                  }}
                  value={inputTagColor}
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
                    addTag(inputTagName);
                  }}
                  className="cursor-pointer items-center bg-blue-100 text-blue-600 duration-300 hover:bg-blue-200"
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
          </div>

          <div className="flex items-center gap-3">
            <Button
              className="w-full bg-violet-100 text-violet-500 duration-200 hover:bg-violet-200"
              type="submit"
            >
              Submit
            </Button>
            <UrlLink
              clickOn={
                <CloseBtn toggleRegisterFormOpen={toggleRegisterFormOpen} />
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
}: {
  toggleRegisterFormOpen: () => void;
}) => {
  return (
    <Button
      onClick={toggleRegisterFormOpen}
      className="w-full bg-red-100 text-red-500 duration-200 hover:bg-red-200"
    >
      Close
    </Button>
  );
};
