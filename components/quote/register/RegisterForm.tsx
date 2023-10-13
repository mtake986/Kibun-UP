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

export default function RegisterForm() {
  const [user] = useAuthState(auth);
  const { registerQuote } = useQuote();
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<ITag[]>([]);
  const [tagColor, setTagColor] = useState<string>("");

  const addTag = (tagInput: string) => {
    if (tagInput.length === 0) {
      alert("Min. 1 character.");
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
  }
  return (
    <div className="px-5 pb-20 pt-10 sm:mb-32 sm:p-0">
      <Form {...form}>
        <HeadingTwo text="Register Form" />
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="quote"
            render={({ field }) => (
              <FormItem className="w-full space-y-0">
                <FormLabel>
                  Quote <span className="text-red-500">*</span>
                </FormLabel>
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
              <FormItem className="w-full space-y-0">
                <FormLabel>
                  Person <span className="text-red-500">*</span>
                </FormLabel>
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
                placeholder="Motivation"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
              />
              <div className="flex gap-2 sm:gap-2 sm:justify-between w-full">
                <Select
                  onValueChange={(color) => {
                    setTagColor(color);
                  }}
                  value={tagColor}
                  disabled={tagInput.length === 0}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem disabled={true} key="tagColor" value="tagColor">
                      Tag color
                    </SelectItem>
                    <Separator />
                    {tagColors.map((color) => (
                      <SelectItem
                        key={color}
                        className={`${changeTagColor(color)}`}
                        value={color}
                      >
                        {tagInput}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  onClick={() => {
                    addTag(tagInput);
                  }}
                  className="cursor-pointer items-center bg-blue-100 text-blue-600 duration-300 hover:bg-blue-200"
                >
                  Add
                </Button>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {tags.map((tag, i) => (
                <Badge
                  key={i}
                  onClick={() => removeTag(tag.tag)}
                  className={`cursor-pointer border-none font-light ${changeTagColor(
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
              className="w-full bg-violet-100 text-violet-500 duration-200 hover:bg-violet-200"
              type="submit"
            >
              Submit
            </Button>
            <UrlLink clickOn={<CloseBtn />} href="/quote" target="_self" />
          </div>
        </form>
      </Form>
    </div>
  );
}

const CloseBtn = () => {
  const { toggleRegisterFormOpen } = useQuote();

  return (
    <Button
      onClick={toggleRegisterFormOpen}
      className="w-full bg-red-100 text-red-500 duration-200 hover:bg-red-200"
    >
      Close
    </Button>
  );
};
