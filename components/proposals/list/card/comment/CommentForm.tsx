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
import { TypeUserFromFirestore } from "@/types/type";
import { AnimatePresence, motion } from "framer-motion";
import { insertFromTopS } from "@/data/CONSTANTS";
import LoadingCover from "@/components/utils/LoadingCover";

type Props = {
  creatorImg: () => React.JSX.Element;
  loginUser: TypeUserFromFirestore;
  toggleAddMode: () => void;
  proposalId: string;
  addComment: (uid: string, comment: string, proposalId: string) => void;
};

const CommentForm = ({
  creatorImg,
  loginUser,
  toggleAddMode,
  proposalId,
  addComment,
}: Props) => {
  // const { addComment } = useComments();
  const [isPending, setIsPending] = useState<boolean>(false);

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
      await addComment(loginUser.uid, values.comment, proposalId);
      console.log(loginUser.uid, values.comment, proposalId);
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
    <motion.div
      variants={{
        hidden: { opacity: 0, x: 0, y: -20 },
        enter: { opacity: 1, x: 0, y: 0 },
        exit: {
          zIndex: 0,
          y: -20,
          opacity: 0,
        },
      }}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: "linear" }}
      className="mt-5 flex gap-3"
    >
      {creatorImg()}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
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
          <div className="mt-2 flex items-center justify-end gap-3 text-xs">
            <button
              className="cursor-pointer hover:opacity-70"
              onClick={toggleAddMode}
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
        </form>
      </Form>

      {isPending ? <LoadingCover spinnerSize="s" /> : null}
    </motion.div>
  );
};

export default CommentForm;
