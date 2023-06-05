"use client";

import Link from "next/link";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { CalendarIcon, Plane, Trash } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { auth } from "@/app/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { IQuote } from "@/types/type";
import { quoteSchema } from "@/form/schema";
import { Switch } from "@/components/ui/switch";

// todo: add more fields like place, time, etc.

type Props = {
  q: IQuote;
  handleCancelEdit: () => void;
  handleDelete: (id: string) => void;
  handleSave: (values: z.infer<typeof quoteSchema>) => void;
};

export default function EditModeOn({
  q,
  handleCancelEdit,
  handleDelete,
  handleSave,
}: Props) {
  const [user] = useAuthState(auth);
  const { reset } = useForm();
  // 1. Define your form.
  const form = useForm<z.infer<typeof quoteSchema>>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      person: q.person,
      quote: q.quote,
      isDraft: q.isDraft,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof quoteSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    // Add a new document with a generated id.
    handleSave(values);
    reset({
      person: '',
      quote: '',
      isDraft: false,
    });
    form.reset();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          name="isDraft"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Draft</FormLabel>
                <FormDescription>
                  Check if you don't want to display this on the home page
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

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              onClick={() => handleCancelEdit()}
              className={` flex items-center gap-2 duration-300  hover:bg-slate-50 hover:text-slate-500 sm:w-auto`}
              variant="ghost"
            >
              <Plane size={14} />
              <span>Cancel</span>
            </Button>
            <Button
              type="submit"
              // onClick={() => handleSave({ eventInput, id: event.id })}
              className={`flex items-center gap-2 duration-300  hover:bg-emerald-50 hover:text-emerald-500 sm:w-auto`}
              variant="ghost"
            >
              <Plane size={14} />
              <span>Save</span>
            </Button>
          </div>
          <Button
            onClick={() => handleDelete(q.id)}
            className={`duration-300  hover:bg-red-50 hover:text-red-500 sm:w-auto`}
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
