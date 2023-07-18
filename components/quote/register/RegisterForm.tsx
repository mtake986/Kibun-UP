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

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "@/components/ui/use-toast";
import { auth, db } from "@/app/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { quoteSchema } from "@/form/schema";
import RegisterFormToggleBtn from "./RegisterFormToggleBtn";
import { Switch } from "@/components/ui/switch";
import { useQuote } from "@/app/context/QuoteContext";

type Props = {
  registerOpen: boolean;
  setRegisterOpen: (prev: boolean) => void;
};

export default function RegisterForm({ registerOpen, setRegisterOpen }: Props) {
  const [user] = useAuthState(auth);
  const { allQuotes, getAllQuotes, registerQuote } = useQuote();

  const { reset } = useForm();
  // 1. Define your form.
  const form = useForm<z.infer<typeof quoteSchema>>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      person: "",
      quote: "",
      isDraft: false,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof quoteSchema>) {
    registerQuote(values, user?.uid);

    reset({
      person: "",
      quote: "",
      isDraft: false,
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
