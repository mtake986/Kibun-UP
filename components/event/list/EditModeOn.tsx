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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { CalendarIcon, Plane, Trash } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { auth } from "@/app/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { IEvent } from "@/types/type";

const formSchema = z.object({
  eventTitle: z.string().min(2).max(50),
  description: z.string().min(2).max(250),
  eventDate: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!",
  }),
});

type Props = {
  event: IEvent;
  handleCancelEdit: () => void;
  handleDelete: (id: string) => void;
  handleSave: (values: z.infer<typeof formSchema>) => void;
};

export default function EditModeOn ({
  event,
  handleCancelEdit,
  handleDelete,
  handleSave,
}: Props) {
  const [user] = useAuthState(auth);
  const { reset } = useForm();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventTitle: event.eventTitle,
      description: event.description,
      eventDate: event.eventDate.toDate(),
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    // Add a new document with a generated id.
    handleSave(values);
    reset({ eventTitle: values.eventTitle, description: values.description, eventDate: values.eventDate});
    form.reset();
  }
  return (
    
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-8 sm:flex-row">
          <FormField
            control={form.control}
            name="eventTitle"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Event Title</FormLabel>
                <FormControl>
                  <Input placeholder="My Birthday" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="eventDate"
            render={({ field }) => (
              <FormItem className=" flex flex-col justify-between">
                <FormLabel>Event Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="My 23rd Birthday at my Parent's house"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              onClick={() => handleCancelEdit()}
              className={` flex items-center gap-2 duration-300  hover:bg-slate-50 hover:text-slate-500 sm:w-auto`}
              variant="ghost"
            >
              <Plane size={14} />
              <span>Cancel</span>
            </Button>
            <Button
              type="submit"
              // onClick={() => handleSave({ eventInput, id: event.id })}
              className={`flex items-center gap-2 duration-300  hover:bg-emerald-50 hover:text-emerald-500 sm:w-auto`}
              variant="ghost"
            >
              <Plane size={14} />
              <span>Save</span>
            </Button>
          </div>
          <Button
            onClick={() => handleDelete(event.id)}
            className={`duration-300  hover:bg-red-50 hover:text-red-500 sm:w-auto`}
            variant="ghost"
          >
            <Trash size={14} />
            {/* <span>Delete</span> */}
          </Button>
        </div>
      </form>
    </Form>
  );
};

// <div className="flex flex-col gap-3">
//   <div className="flex items-center gap-5">
//     <BsFillPersonFill size={24} />
//     <Input
//       onChange={(e) => {
//         setEventInput((prev) => ({
//           ...prev,
//           description: e.target.value,
//         }));
//       }}
//       defaultValue={event.description}
//       value={event.description}
//       id="Description"
//       placeholder="My 23rd HBD"
//     />
//   </div>
//   <div className="flex items-center gap-5">
//     <BsChatLeftText size={24} />
//     <Input
//       onChange={(e) => {
//         setEventInput((prev) => ({
//           ...prev,
//           eventTitle: e.target.value,
//         }));
//       }}
//       value={event.eventTitle}
//       defaultValue={event.eventTitle}
//       id="Event Title"
//       placeholder="HBD"
//     />
//   </div>
//   <div className="flex items-center gap-5">
//     <BsChatLeftText size={24} />

//     <Popover>
//       <PopoverTrigger asChild>
//         <Button
//           variant={"outline"}
//           className={cn(
//             "w-[280px] justify-start text-left font-normal",
//             !date && "text-muted-foreground"
//           )}
//         >
//           <CalendarIcon className="mr-2 h-4 w-4" />
//           {date ? format(date, "PPP") : <span>Pick a date</span>}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-auto p-0">
//         <Calendar
//           mode="single"
//           selected={date}
//           onSelect={setDate}
//           initialFocus
//         />
//       </PopoverContent>
//     </Popover>
//   </div>
// </div>
