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

import { Plane, Trash } from "lucide-react";
import { auth } from "@/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { TypeQuote, ITag } from "@/types/type";
import { quoteSchema } from "@/form/schema";
import { Switch } from "@/components/ui/switch";
import { useQuote } from "@/context/QuoteContext";
import { MdAdd, MdClose, MdOutlineCancel } from "react-icons/md";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tagColors } from "@/public/CONSTANTS";
import { changeTagColor } from "@/functions/functions";

type Props = {
  q: TypeQuote;
  setIsUpdateMode: (boo: boolean) => void;
};

export default function EditModeOn({ q, setIsUpdateMode }: Props) {
  const [user] = useAuthState(auth);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<ITag[]>(q.tags || []);
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
      person: q.person,
      quote: q.quote,
      isDraft: q.isDraft,
      tags: [],
    },
  });

  const { handleUpdate, handleDelete } = useQuote();

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
      tags: [],
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
          {tagColor}

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
                    className={`${changeTagColor(color)}`}
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
                variant="outline"
                className={`border-none font-light hover:opacity-70 ${changeTagColor(
                  tagColor
                )}`}
              >
                #{tagInput}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Button
              onClick={() => setIsUpdateMode(false)}
              className={` flex items-center gap-2 duration-300  hover:bg-red-50 hover:text-red-500`}
              variant="ghost"
            >
              <span>Cancel</span>
            </Button>
            <Button
              type="submit"
              className={`flex items-center gap-2 duration-300  hover:bg-emerald-50 hover:text-emerald-500`}
              variant="ghost"
            >
              <span>Save</span>
            </Button>
          </div>
          <Button
            onClick={() => handleDelete(q.id)}
            className={`duration-300  hover:bg-red-50 hover:text-red-500`}
            variant="ghost"
          >
            <Trash size={14} />
            {/* <span>Delete</span> */}
          </Button>
        </div>
      </form>
    </Form>
  );
}
