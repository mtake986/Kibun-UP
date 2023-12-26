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

import { auth } from "@/config/Firebase";
import { contactEmailSchema } from "@/form/schema";
import { Textarea } from "../ui/textarea";
import { init, send } from "@emailjs/browser";
import { useEffect, useState } from "react";
import HeadingTwo from "../utils/HeadingTwo";
import UrlLink from "../utils/UrlLink";
import { useAuth } from "@/context/AuthContext";
import { displaySuccessToast, displayToast } from "@/functions/displayToast";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const { fetchLoginUser } = useAuth();

  useEffect(() => {
    fetchLoginUser(auth.currentUser);
  }, []);

  // 1. Define your form.
  const form = useForm<z.infer<typeof contactEmailSchema>>({
    resolver: zodResolver(contactEmailSchema),
    defaultValues: {
      sender_name: "",
      sender_email: "",
      title: "",
      message: "",
    },
  });

  const sendEmail = async (values: z.infer<typeof contactEmailSchema>) => {
    setLoading(true);
    // 必要なIDをそれぞれ環境変数から取得
    const userID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;
    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

    if (userID && serviceID && templateID) {
      // emailJS初期化
      init(userID);

      // emailJS送信データを定義
      const params = {
        sender_name: values.sender_name,
        sender_email: values.sender_email,
        title: values.title,
        message: values.message,
      };

      // emailJS送信
      try {
        await send(serviceID, templateID, params);
        displaySuccessToast({
          text: "Thanks for reaching out to me!!",
        });
        form.reset();
        setLoading(false);
      } catch (error) {
        // 送信失敗したらalertで表示
        displayToast({
          text: "ERROR: Failed to send email. Please try again. " + error,
          color: "red",
        });
        setLoading(false);
      }
    }
  };

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof contactEmailSchema>) {
    sendEmail(values);
    // reset();
  }

  return (
    <div className="px-5 py-10 pb-20 sm:mb-32 sm:p-0">
      <HeadingTwo text="Contact Form" />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="sender_name"
              render={({ field }) => (
                <FormItem className="w-full space-y-0">
                  <FormLabel>
                    Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
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
              name="sender_email"
              render={({ field }) => (
                <FormItem className="w-full space-y-0">
                  <FormLabel>
                    Email <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john.doe@gmail.com"
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
              name="title"
              render={({ field }) => (
                <FormItem className="w-full space-y-0">
                  <FormLabel>
                    Title <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="This is Awesome!!"
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
              name="message"
              render={({ field }) => (
                <FormItem className="w-full space-y-0">
                  <FormLabel className="text-base">
                    Message <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="border-none bg-slate-50 dark:border-none"
                      placeholder="This is Awesome!!"
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
}
