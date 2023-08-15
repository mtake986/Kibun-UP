"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { auth } from "@/app/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { quoteSchema } from "@/form/schema";
import RegisterFormToggleBtn from "./RegisterFormToggleBtn";
import { Switch } from "@/components/ui/switch";
import { useQuote } from "@/app/context/QuoteContext";
import { IUserInfo } from "@/types/type";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { MdAdd, MdClose } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tagColors } from "@/public/CONSTANTS";
import { ITag } from "@/types/type";
import { changeTagColor } from "@/utils/functions";

type Props = {
  registerOpen: boolean;
  setRegisterOpen: (prev: boolean) => void;
};

export default function RegisterForm({ registerOpen, setRegisterOpen }: Props) {
  const [user] = useAuthState(auth);
  const { getAllQuotes, registerQuote } = useQuote();
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<ITag[]>([]);
  const [tagColor, setTagColor] = useState<string>("");

  const addTag = (tagInput: string) => {
    if (tagInput.length === 0) {
      alert("Min 0 character.");
    } else if (tagInput.length > 20) {
      alert("Maximum 20 characters.");
    } else {
      if (!tags.map((tag) => tag.tag).includes(tagInput)) {
        if (tags.length === 0) {
          setTags([{ tag: tagInput, tagColor }]);
          setTagInput("");
          setTagColor("");
        } else if (tags.length === 5) {
          alert("Maximum 5 tags.");
        } else {
          setTags([...tags, { tag: tagInput, tagColor }]);
          setTagInput("");
          setTagColor("");
        }
      } else {
        alert("Not Allowed The Same Tag.");
      }
    }
  };
  const removeTag = (tagInput: string) => {
    setTags(tags.filter((tag) => tag.tag !== tagInput));
  };

  const { reset } = useForm();
  // 1. Define your form.
  const form = useForm<z.infer<typeof quoteSchema>>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      person: "",
      quote: "",
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
    values.tags = tags;
    registerQuote(values, userInfo);

    reset({
      person: "",
      quote: "",
      isDraft: false,
      tags: [],
    });
    form.reset();
    setTags([]);
    getAllQuotes();
  }
  return (
    <Form {...form}>
      <h2 className="mb-2 mt-4 text-center text-3xl font-bold">
        Register Form
      </h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="quote"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Quote</FormLabel>
              <FormControl>
                <Input
                  placeholder="Just Do It"
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
          name="person"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Person</FormLabel>
              <FormControl>
                <Input placeholder="NIKE" {...field} />
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
              <div className="space-y-0.5">
                <FormLabel className="text-base">Draft</FormLabel>
                <FormDescription>
                  Check if you do not want to display this on the home page
                </FormDescription>
              </div>
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

          <div className="mt-2 flex items-center gap-5">
            <Input
              maxLength={20}
              placeholder="Motivation"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />
            <Select
              onValueChange={(color) => {
                setTagColor(color);
              }}
              value={tagColor}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Color" />
              </SelectTrigger>
              <SelectContent>
                {tagColors.map((color) => (
                  <SelectItem
                    key={color}
                    className={`${
                      color === "red"
                        ? "bg-red-50 text-red-500 hover:bg-red-50 hover:text-red-500"
                        : color === "orange"
                        ? "bg-orange-50 text-orange-500 hover:bg-orange-50 hover:text-orange-500"
                        : color === "green"
                        ? "bg-green-50 text-green-500 hover:bg-green-50 hover:text-green-500"
                        : color === "blue"
                        ? "bg-blue-50 text-blue-500 hover:bg-blue-50 hover:text-blue-500"
                        : color === "purple"
                        ? "bg-purple-50 text-purple-500 hover:bg-purple-50 hover:text-purple-500"
                        : "bg-white text-black hover:bg-white hover:text-black"
                    }`}
                    value={color}
                  >
                    {tagInput}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <MdAdd
              onClick={() => {
                addTag(tagInput);
              }}
              size={36}
              className="flex cursor-pointer items-center gap-1 text-black duration-300 hover:opacity-70"
            />
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {tags.map((tag, i) => (
              <Badge
                key={i}
                onClick={() => removeTag(tag.tag)}
                className={`cursor-pointer border-none font-light hover:opacity-70 ${changeTagColor(
                  tag.tagColor
                )}`}
              >
                #{tag.tag}
                <MdClose className="ml-1 cursor-pointer rounded-full" />
              </Badge>
            ))}
            {tagInput && (
              <Badge
                className={` border-none font-light hover:opacity-70 ${changeTagColor(
                  tagColor
                )}`}
              >
                #{tagInput}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            className="w-full bg-violet-100 text-violet-500 hover:bg-violet-100 hover:opacity-70"
            type="submit"
          >
            Submit
          </Button>
          <RegisterFormToggleBtn
            registerOpen={registerOpen}
            setRegisterOpen={setRegisterOpen}
          />
        </div>
      </form>
    </Form>
  );
}
