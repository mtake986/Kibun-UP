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

import { CalendarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "@/components/ui/use-toast";
import { auth, db } from "@/app/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { eventSchema } from "@/form/schema";
import RegisterFormToggleBtn from "./RegisterFormToggleBtn";
import { Switch } from "@/components/ui/switch";
import { IUserInfo } from "@/types/type";

import HeadingThree from "@/components/utils/HeadingThree";
import { useEvent } from "@/app/context/EventContext";

type Props = {
  registerOpen: boolean;
  setRegisterOpen: (prev: boolean) => void;
};

export default function RegisterForm({ registerOpen, setRegisterOpen }: Props) {
  const [user] = useAuthState(auth);
  const { getLoginUserEvents, registerEvent } = useEvent();

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
    const collectionRef = collection(db, "events");
    const userInfo: IUserInfo = {
      uid: user?.uid,
      displayName: user?.displayName,
      photoUrl: user?.photoURL,
    };
    registerEvent(values, userInfo);
    reset({
      eventTitle: "",
      place: "",
      description: "",
      eventDate: new Date(),
    });
    form.reset();
    getLoginUserEvents();
  }
  return (
    <Form {...form}>
      <HeadingThree text="Register Form" />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-8 sm:flex-row">
          <FormField
            control={form.control}
            name="eventTitle"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Event Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="My Birthday"
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
                    placeholder="My Parent's house (SLC, Utah)"
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
              <FormLabel>Event Date</FormLabel>
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
                <PopoverContent className="w-auto p-0" align="start">
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
                  placeholder="My 23rd Birthday at my Parent's house"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-3">
          <Button
            className="w-full bg-violet-100 text-violet-500 hover:bg-violet-50"
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
