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
import { auth } from "@/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { TypeEvent } from "@/types/type";
import { eventSchema } from "@/form/schema";
import { useEvent } from "@/context/EventContext";

type Props = {
  event: TypeEvent;
  setIsUpdateMode: (boo: boolean) => void;
  setIsLoading: (boo: boolean) => void;
};

export default function EditModeOn({
  event,
  setIsUpdateMode,
  setIsLoading,
}: Props) {
  const [user] = useAuthState(auth);
  const { handleUpdate, handleDelete } = useEvent();

  const { reset } = useForm();
  // 1. Define your form.
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      eventTitle: event.eventTitle,
      place: event.place,
      description: event.description,
      eventDate: event.eventDate.toDate(),
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof eventSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // Add a new document with a generated id.
    handleUpdate(values, event.id, setIsLoading);
    setIsUpdateMode(false);
    reset({
      eventTitle: values.eventTitle,
      place: values.place,
      description: values.description,
      eventDate: values.eventDate,
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:gap-8">
          <FormField
            control={form.control}
            name="eventTitle"
            render={({ field }) => (
              <FormItem className="mb-2 w-full sm:mb-0">
                <FormLabel>
                  Event Title <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ex.) My Birthday" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="place"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Place</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex.) My Parent's house (SLC, Utah)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="eventDate"
          render={({ field }) => (
            <FormItem className=" flex flex-col justify-between">
              <FormLabel>
                Event Date <span className="text-red-500">*</span>
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] border-none bg-slate-50 pl-3 text-left font-normal dark:border-none dark:bg-slate-900",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="bg-slate-50 dark:border-none dark:bg-slate-900"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ex.) My 23rd Birthday at my Parent's house"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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