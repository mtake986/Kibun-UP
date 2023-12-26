"use client";
import React from "react";
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
import { proposalSchema } from "@/form/schema";
import { init, send } from "@emailjs/browser";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { displaySuccessToast, displayToast } from "@/functions/displayToast";
import HeadingTwo from "@/components/utils/HeadingTwo";
import { Textarea } from "@/components/ui/textarea";
import UrlLink from "@/components/utils/UrlLink";
import RequiredMark from "@/components/utils/RequiredMark";

const ProposalForm = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof proposalSchema>>({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      title: "",
      detail: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof proposalSchema>) {
    console.log(values);
  }

  return (
    <div className="px-5 py-10 pb-20 sm:mb-32 sm:p-0">
      <HeadingTwo text="Proposal Form" />
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full space-y-0">
                  <FormLabel>
                    Title <RequiredMark />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Fix the bug"
                      {...field}
                      // defaultValue={field.value}
                      className="border-none bg-slate-50 dark:border-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="detail"
              render={({ field }) => (
                <FormItem className="w-full space-y-0">
                  <FormLabel className="text-base">Detail</FormLabel>
                  <FormControl>
                    <Textarea
                      className="border-none bg-slate-50 dark:border-none"
                      placeholder="I found a bug in the app. Please fix it"
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
            </div>
          </form>
        </Form>
      )}
      <p className="sm:text-md mt-5 text-center text-xs">
        Or, you can{" "}
        <UrlLink
          className="text-sky-500 underline-offset-2 hover:underline"
          target="_blank"
          href="https://github.com/mtake986/Kibun-UP/issues"
          clickOn="create an issue"
        />{" "}
        in GitHub.
      </p>
    </div>
  );
};

export default ProposalForm;
