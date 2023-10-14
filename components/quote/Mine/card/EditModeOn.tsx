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
import { TypeQuote, ITag } from "@/types/type";
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

type Props = {
  q: TypeQuote;
  setIsUpdateMode: (boo: boolean) => void;
};

export default function EditModeOn({ q, setIsUpdateMode }: Props) {
  const [user] = useAuthState(auth);
  const { reset } = useForm();
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<ITag[]>(q.tags || []);
  const [tagColor, setTagColor] = useState<string>("");

  const addTag = (tagInput: string) => {
    if (tagInput.length === 0) {
      alert("Min.1 character.");
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
  // 1. Define your form.
  const form = useForm<z.infer<typeof quoteSchema>>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      person: q.person,
      quote: q.quote,
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
    values.tags = tags;
    handleUpdate(q.id, values, user?.uid);
    setIsUpdateMode(false);
    reset({
      person: "",
      quote: "",
      isDraft: false,
    });
    form.reset();
  }

  return (
    <Form {...form}>
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
            <div className="flex w-full gap-2 sm:justify-between sm:gap-2">
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
            onClick={() => setIsUpdateMode(false)}
            className={`flex w-full items-center gap-2 bg-red-50 text-red-500 duration-300 hover:bg-red-50 hover:text-red-500 hover:opacity-70`}
            variant="ghost"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className={`flex w-full items-center gap-2 bg-emerald-50 text-emerald-500 duration-300 hover:bg-emerald-50 hover:text-emerald-500 hover:opacity-70`}
            variant="ghost"
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
