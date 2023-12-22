import { Textarea } from "@/components/ui/textarea";
import { commentSchema } from "@/form/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { displayToast } from "@/functions/displayToast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { TypeComment } from "@/types/type";
import useComments from "../hooks/useComments";
import LoadingSpinnerXS from "@/components/utils/LoadingSpinnerXS";
import LoadingCover from "@/components/utils/LoadingCover";

type Props = {
  comment: TypeComment;
  setIsUpdateMode: React.Dispatch<React.SetStateAction<boolean>>;
  eid: string;
};

const CommentUpdateForm = ({ comment, setIsUpdateMode, eid }: Props) => {
  const { updateComment } = useComments();
  const [isPending, setIsPending] = useState<boolean>(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: comment.comment,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof commentSchema>) {
    setIsPending(true);
    try {
      await updateComment(comment.id, values.comment, eid);
      setIsUpdateMode(false);
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="w-full space-y-0">
              <FormControl>
                <Textarea
                  className="min-h-10 w-full border-none bg-slate-50 dark:border-none"
                  placeholder="Add a comment..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-2 flex items-center justify-end gap-3 text-xs">
          <button
            className="cursor-pointer hover:opacity-70"
            onClick={() => setIsUpdateMode(false)}
            type="button"
          >
            Cancel
          </button>
          <button
            className="cursor-pointer rounded-full bg-blue-500 px-3 py-1 text-white hover:opacity-70"
            type="submit"
          >
            Submit
          </button>
        </div>
        {isPending ? <LoadingCover spinnerSize="s" /> : null}
      </form>
    </Form>
  );
};

export default CommentUpdateForm;
