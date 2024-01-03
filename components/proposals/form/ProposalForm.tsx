"use client";
import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import RequiredMark from "@/components/utils/RequiredMark";
import Subtitle from "../subtitle/Subtitle";
import LoadingCover from "@/components/utils/LoadingCover";
import { twMerge } from "tailwind-merge";
import useProposals from "./hooks/useProposals";
import CreateAnIssueLink from "./CreateAnIssueLink";
import SendMessageToCreatorLink from "./SendMessageToCreatorLink";
import { Checkbox } from "@/components/ui/checkbox";
import { labelsForProposals } from "@/data/CONSTANTS";
import { capitalizeFirstLetter } from "@/functions/capitalizeFirstLetter";

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
      labels: [],
    },
  });

  const sendEmail = async (values: z.infer<typeof proposalSchema>) => {
    // 必要なIDをそれぞれ環境変数から取得
    const userID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;
    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_NEW_PROPOSAL;

    if (userID && serviceID && templateID) {
      // emailJS初期化
      init(userID);

      // emailJS送信データを定義
      const params = {
        uid: loginUser?.uid,
        title: values.title,
        description: values.description,
        labels: values.labels,
      };

      // emailJS送信
      try {
        await send(serviceID, templateID, params);
      } catch (error) {
        // 送信失敗したらalertで表示
        displayToast({
          text: "ERROR: Failed to send email to the creator. Please try again. " + error,
          color: "red",
        });
      }
    }
  };
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof proposalSchema>) {
    if (loginUser) {
      setIsPending(true);
      submitProposal(values, loginUser.uid).then(() => {
        form.reset();
        sendEmail(values);
        setIsPending(false);
        displaySuccessToast({text: "Successfully created!"});
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

            <FormField
              control={form.control}
              name="labels"
              render={() => (
                <FormItem>
                  <div className="mb-1">
                    <FormLabel className="text-base">
                      Labels <RequiredMark />
                    </FormLabel>
                  </div>
                  {labelsForProposals.map((item) => (
                    <FormField
                      key={item}
                      control={form.control}
                      name="labels"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {capitalizeFirstLetter(item)}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage className="text-red-500" />
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
