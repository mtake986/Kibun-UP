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
import LoadingCover from "@/components/utils/LoadingCover";
import { twMerge } from "tailwind-merge";
import useProposals from "../../form/hooks/useProposals";
import { TypeProposal } from "@/types/type";

type Props = {
  proposal: TypeProposal;
  setIsUpdateMode: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCardLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
const UpdateMode = ({ proposal, setIsUpdateMode, setIsCardLoading }: Props) => {
  const { loginUser, fetchLoginUser } = useAuth();

  const [isPending, setIsPending] = useState<boolean>(false);
  const { updateProposal, fetchProposals } = useProposals();

  useEffect(() => {
    if (auth.currentUser) {
      if (!loginUser) fetchLoginUser(auth.currentUser);
    }
  }, [auth.currentUser, loginUser, fetchLoginUser]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof proposalSchema>>({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      title: proposal.title,
      description: proposal?.description ?? "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof proposalSchema>) {
    setIsPending(true);
    if (loginUser) {
      updateProposal(proposal.id, values)
        .then(() => {
          setIsPending(false);
          setIsCardLoading(false);
          setIsUpdateMode(false);
        })
        .catch((error) => {
          displayErrorToast({
            text: "Error updating proposal: " + error.message,
          });
          setIsPending(false);
        });
    } else {
      displayErrorToast("Please log in.");
      setIsPending(false);
    }
    // fetchProposals();
  }

  return (
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
                <FormMessage className="text-red-500" />
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
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-5">
            <button
              className="w-full cursor-pointer rounded-md bg-green-50 px-3 py-2.5 text-sm text-green-500 duration-300 ease-in hover:bg-green-100 dark:bg-green-700 dark:text-white  dark:hover:bg-green-600"
              type="submit"
            >
              Submit
            </button>
            <button
              className="cursor-pointer rounded-md bg-red-50 px-3 py-2.5 text-sm text-red-500 duration-300 ease-in hover:bg-red-100 dark:bg-red-700 dark:text-white  dark:hover:bg-red-600"
              type="submit"
              onClick={() => {
                setIsUpdateMode(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </Form>
      {isPending ? <LoadingCover spinnerSize="s" /> : null}
    </div>
  );
};

export default UpdateMode;
