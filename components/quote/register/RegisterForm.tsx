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
import { handleClientScriptLoad } from "next/script";

type Props = {
  registerOpen: boolean;
  setRegisterOpen: (prev: boolean) => void;
};

export default function RegisterForm({ registerOpen, setRegisterOpen }: Props) {
  const [user] = useAuthState(auth);
  const { getAllQuotes, registerQuote } = useQuote();
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const addTag = (tagInput: string) => {
    if (tagInput) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };
  const removeTag = (tagInput: string) => {
    setTags(tags.filter((tag) => tag !== tagInput));
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
              placeholder="Motivation"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />
            <MdAdd
              onClick={() => {
                addTag(tagInput);
              }}
              size={36}
              className="flex cursor-pointer items-center gap-1 text-black duration-300 hover:opacity-70"
            />
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {tags.map((tag) => (
              <Badge variant="outline" onClick={() => removeTag(tag)} className="hover:bg-red-50 cursor-pointer hover:text-red-500">
                {tag}
                <MdClose
                  onClick={() => removeTag(tag)}
                  className="ml-1 cursor-pointer rounded-full"
                />
              </Badge>
            ))}
          </div>
        </div>

        {/* <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input placeholder="Motivation" onChange={(e) => setTagInput(e.target.value)} />
                <div>{tagInput}</div>
                <Button onClick={() => setTags([tags, tagInput])}>Add</Button>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

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
