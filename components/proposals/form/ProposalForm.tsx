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
import {
  displayErrorToast,
  displaySuccessToast,
  displayToast,
} from "@/functions/displayToast";
import HeadingTwo from "@/components/utils/HeadingTwo";
import { Textarea } from "@/components/ui/textarea";
import UrlLink from "@/components/utils/UrlLink";
import RequiredMark from "@/components/utils/RequiredMark";
import Subtitle from "../subtitle/Subtitle";
import LoadingCover from "@/components/utils/LoadingCover";
import { twMerge } from "tailwind-merge";
import useProposals from "./hooks/useProposals";
import CreateAnIssueLink from "./CreateAnIssueLink";
import SendMessageToCreatorLink from "./SendMessageToCreatorLink";

const ProposalForm = () => {
  const { loginUser, fetchLoginUser } = useAuth();

  const [isPending, setIsPending] = useState<boolean>(false);
  const { submitProposal, fetchProposals } = useProposals();

  useEffect(() => {
    if (auth.currentUser) {
      if (!loginUser) fetchLoginUser(auth.currentUser);
    }
  }, [auth.currentUser, loginUser, fetchLoginUser]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof proposalSchema>>({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof proposalSchema>) {
    if (loginUser) {
      setIsPending(true);
      submitProposal(values, loginUser.uid).then(() => {
        form.reset();
        setIsPending(false);
      });
    } else {
      displayErrorToast("Please log in.");
    }
    fetchProposals();
  }

  return (
    <div className="mb-10">
      <div className="mb-4 flex flex-col">
        <h2 className="mb-1 text-center text-3xl font-bold">Proposal Form</h2>
        <Subtitle />
      </div>
      <div className={twMerge(isPending ? "relative opacity-50" : "relative")}>
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
                      placeholder="Summary of the proposal"
                      {...field}
                      className="border-none bg-slate-50 dark:border-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full space-y-0">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description in detail"
                      className="border-none bg-slate-50 dark:border-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button
              className="w-full cursor-pointer rounded-md bg-green-50 px-3 py-2.5 text-sm text-green-500 duration-300 ease-in hover:bg-green-100 dark:bg-green-700 dark:text-white  dark:hover:bg-green-600"
              type="submit"
            >
              Submit
            </button>
          </form>
        </Form>
        <CreateAnIssueLink />
        <SendMessageToCreatorLink />
        {isPending ? <LoadingCover spinnerSize="s" /> : null}
      </div>
    </div>
  );
};

export default ProposalForm;
