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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { CalendarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { auth } from "@/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { eventSchema } from "@/form/schema";

import { useEvent } from "@/context/EventContext";
import HeadingTwo from "@/components/utils/HeadingTwo";
import UrlLink from "@/components/utils/UrlLink";
import { displayErrorToast } from "@/functions/displayToast";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export default function RegisterForm() {
  const { loginUser, fetchLoginUser } = useAuth();
  const { getLoginUserEvents, registerEvent } = useEvent();
  useEffect(() => {
    if (!loginUser) fetchLoginUser(auth.currentUser);
  }, [auth.currentUser]);
  const { reset } = useForm();
  // 1. Define your form.
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      eventTitle: "",
      place: "",
      description: "",
      eventDate: new Date(),
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof eventSchema>) {
    if (loginUser) {
      registerEvent(values, loginUser.uid);
      reset({
        eventTitle: "",
        place: "",
        description: "",
        eventDate: new Date(),
      });
      form.reset();
      getLoginUserEvents();
    } else {
      displayErrorToast("Please log in.");
    }
  }
  return (
    <div className="px-5 pb-20 pt-10 sm:mb-32 sm:p-0">
      {loginUser ? <div>exists</div> : <div>not exists</div>}
      <Form {...form}>
        <HeadingTwo text="Register Form" />
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="hidden sm:flex sm:flex-row sm:gap-8">
            <FormField
              control={form.control}
              name="eventTitle"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Event Title<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex.) My Birthday"
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
            name="eventTitle"
            render={({ field }) => (
              <FormItem className="w-full sm:hidden">
                <FormLabel>
                  Event Title <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex.) My Birthday"
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
            name="place"
            render={({ field }) => (
              <FormItem className="w-full sm:hidden">
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
                          "w-[240px] pl-3 text-left font-normal",
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
                  <PopoverContent
                    className="w-auto p-0 dark:bg-slate-800 dark:text-white"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {/* <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription> */}
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
            <button
              className="w-full cursor-pointer rounded-md bg-green-50 px-3 py-2.5 text-sm text-green-500 duration-300 ease-in hover:bg-green-100 dark:bg-green-700 dark:text-white  dark:hover:bg-green-600"
              type="submit"
            >
              Submit
            </button>
            <UrlLink clickOn={<CloseBtn />} href="/event" target="_self" />
          </div>
        </form>
      </Form>
    </div>
  );
}

const CloseBtn = () => {
  const { toggleRegisterFormOpen } = useEvent();

  return (
    <button
      onClick={toggleRegisterFormOpen}
      className="cursor-pointer rounded-md bg-red-50 px-3 py-2.5 text-sm text-red-500 duration-300 ease-in hover:bg-red-100 dark:bg-red-700 dark:text-white  dark:hover:bg-red-600"
    >
      Close
    </button>
  );
};
