import { Textarea } from "@/components/ui/textarea";
import { commentSchema } from "@/form/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useComments from "./hooks/useComments";
import {
  displayToast,
} from "@/functions/displayToast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { TypeUserFromFirestore } from "@/types/type";
import Image from "next/image";
import LoadingSpinnerS from "@/components/utils/LoadingSpinnerS";

type Props = {
  loginUser: TypeUserFromFirestore;
  toggleAddMode: () => void;
  eid: string;
};

const CommentForm = ({ loginUser, toggleAddMode, eid }: Props) => {
  const { addComment, fetchComments } = useComments();
  const [isPending, setIsPending] = useState<boolean>(false);

  const creatorImg = useCallback(() => {
    return (
      <Image
        src={loginUser.photoURL}
        alt="profile photo"
        width={40}
        height={40}
        className="rounded-full"
      />
    );
  }, []);

  // 1. Define your form.
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof commentSchema>) {
    setIsPending(true);
    try {
      await addComment(loginUser.uid, values.comment, eid);
      await fetchComments(eid);
    } catch (error) {
      // 送信失敗したらalertで表示
      displayToast({
        text: "ERROR: Failed to send email. Please try again. " + error,
        color: "red",
      });
    } finally {
      setIsPending(false);
      form.reset({
        comment: "",
      });
    }
  }

  return (
    <div>
      {/* {isPending ? (
        <LoadingSpinnerS />
      ) : ( */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex items-start gap-3">
              {creatorImg()}
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem className="w-full space-y-0">
                    <FormControl>
                      <Textarea
                        className="min-h-10 border-none bg-slate-50 dark:border-none"
                        placeholder="Add a comment..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-2 flex items-center justify-end gap-3 text-xs">
              <button
                className="cursor-pointer hover:opacity-70"
                onClick={toggleAddMode}
              >
                Cancel
              </button>
              <button
                className="cursor-pointer rounded-full bg-blue-500 px-3 py-1 hover:opacity-70"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </Form>
      {/* // )} */}
    </div>
  );
};

export default CommentForm;
