"use client";
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

import { auth } from "@/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { contactEmailSchema } from "@/form/schema";
import { Textarea } from "../ui/textarea";
import { init, send } from "@emailjs/browser";
import { toast } from "../ui/use-toast";
import { useEffect, useState } from "react";
import Loading from "../utils/Loading";
import HeadingTwo from "../utils/HeadingTwo";
import UrlLink from "../utils/UrlLink";
import { useAuth } from "@/context/AuthContext";

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
        toast({
          className: "border-none bg-green-500 text-white",
          title: "Success: Sent successfully",
        });
        form.reset();
        setLoading(false);
      } catch (error) {
        // 送信失敗したらalertで表示
        toast({
          className: "border-none bg-red-500 text-white",
          title: "ERROR: Failed to send it",
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
        <Loading />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="sender_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
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
              name="sender_email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="This is Awesome!!" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-base">Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="This is Awesome!!" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-3">
              <Button
                className="w-full bg-violet-100 text-violet-500 hover:bg-violet-100 hover:opacity-70"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      )}
      <p className="sm:text-md mt-5 text-center text-xs">
        Or, you can{" "}
        <UrlLink
          className="text-sky-500 hover:underline"
          target="_blank"
          href="https://github.com/mtake986/Kibun-UP/issues"
          clickOn="create an issue"
        />{" "}
        in GitHub.
      </p>
    </div>
  );
}
