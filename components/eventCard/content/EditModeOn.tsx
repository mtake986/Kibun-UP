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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { auth } from "@/config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ITag, TypeEvent, TypeTagError, TypeTagErrors } from "@/types/type";
import { eventSchema } from "@/form/schema";
import { useEvent } from "@/context/EventContext";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LoadingCover from "@/components/utils/LoadingCover";
import { twMerge } from "tailwind-merge";
import { displayErrorToast } from "@/functions/displayToast";
import { VALIDATION_STATUS, tagColors } from "@/data/CONSTANTS";
import { Badge } from "@/components/ui/badge";
import { capitalizeFirstLetter } from "@/functions/capitalizeFirstLetter";
import { changeTagColor } from "@/functions/functions";
import { Separator } from "@/components/ui/separator";
import { MdClose } from "react-icons/md";
import TagErrors from "@/components/quoteCard/content/TagErrors";

type Props = {
  event: TypeEvent;
  setIsUpdateMode: (boo: boolean) => void;
};

export default function EditModeOn({ event, setIsUpdateMode }: Props) {
  const [user] = useAuthState(auth);
  const [isPending, setIsPending] = useState<boolean>(false);

  const { handleUpdate, getEventsWithSortAndFilter, fetchProfileUserEvents } =
    useEvent();
  const pathname = usePathname();
    const [inputTagName, setInputTagName] = useState("");
    const [inputTagColor, setInputTagColor] = useState<string>("");
    const [inputTags, setInputTags] = useState<ITag[]>(event.tags || []);
    const [tagErrors, setTagErrors] = useState<TypeTagErrors>({});

    const isAddBtnDisabled =
      inputTagName.length <= 0 ||
      inputTagName.length > 20 ||
      inputTags.length >= 5 ||
      inputTags.some((tag) => tag.name === inputTagName);

    const validateInputTags = (): string => {
      if (inputTags.length === 5) {
        const error: TypeTagError = {
          message: "Maximum 5 tags",
        };
        setTagErrors({ ...tagErrors, over5tags: error });
        return VALIDATION_STATUS.FAIL;
      } else {
        setTagErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors["over5tags"];
          return newErrors;
        });
      }
      if (!inputTagName || inputTagName.length <= 0) {
        const error: TypeTagError = {
          message: "Tag name is required",
        };
        setTagErrors({ ...tagErrors, undefOrNoChars: error });
        return VALIDATION_STATUS.FAIL;
      } else {
        // delete tagErrors["undefOrNoChars"];
        setTagErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors["undefOrNoChars"];
          return newErrors;
        });
      }
      if (inputTagName.length > 20) {
        const error: TypeTagError = {
          message: "Max. 20 characters",
        };
        setTagErrors({ ...tagErrors, over20chars: error });
        return VALIDATION_STATUS.FAIL;
      } else {
        setTagErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors["over20chars"];
          return newErrors;
        });
      }
      if (inputTags.map((tag) => tag.name).includes(inputTagName)) {
        const error: TypeTagError = {
          message: "Not Allowed The Same Tag",
        };
        setTagErrors({ ...tagErrors, sameTagName: error });
        return VALIDATION_STATUS.FAIL;
      } else {
        setTagErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors["sameTagName"];
          return newErrors;
        });
      }
      return VALIDATION_STATUS.PASS;
    };

    const addTag = () => {
      const defaultColor = "white";
      setInputTags([
        ...inputTags,
        { name: inputTagName, color: inputTagColor || defaultColor },
      ]);
      setInputTagName("");
      setInputTagColor("");
    };

    const removeTag = (tagName: string) => {
      setInputTags(inputTags.filter((tag) => tag.name !== tagName));
    };


  const getButtonClasses = (isDisabled: boolean) => {
    const baseClasses =
      "cursor-pointer rounded-md px-3 py-2 text-sm duration-300 ease-in";
    const enabledClasses =
      "bg-blue-50 text-blue-500 hover:bg-blue-100 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-600";
    const disabledClasses =
      "cursor-not-allowed bg-blue-50 text-blue-500 opacity-30 dark:bg-blue-700 dark:text-white";
    return `${baseClasses} ${isDisabled ? disabledClasses : enabledClasses}`;
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      eventTitle: event.eventTitle,
      place: event.place,
      description: event.description,
      eventDate: event.eventDate.toDate(),
      tags: event.tags,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof eventSchema>) {
    setIsPending(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // Add a new document with a generated id.
    values.tags = inputTags;
    handleUpdate(values, event.id)
      .then(() => {
        if (pathname.includes("profile")) {
          fetchProfileUserEvents(event.createdBy);
        } else {
          getEventsWithSortAndFilter('loginUser');
        }
        setIsPending(false);
        setIsUpdateMode(false);
      })
      .catch((err: any) => {
        setIsPending(false);
        displayErrorToast(err);
      });
  }

  return (
    <div className={twMerge("relative", isPending ? "opacity-50" : "")}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:gap-8">
            <FormField
              control={form.control}
              name="eventTitle"
              render={({ field }) => (
                <FormItem className="mb-2 w-full sm:mb-0">
                  <FormLabel>
                    Event Title <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="My Birthday" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="place"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Place</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="My Parent's house (SLC, Utah)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="eventDate"
            render={({ field }) => (
              <FormItem className=" flex flex-col justify-between">
                <FormLabel>
                  Event Date <span className="text-red-500">*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] border-none bg-slate-50 pl-3 text-left font-normal dark:border-none dark:bg-slate-900",
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
                  <PopoverContent
                    className="w-auto p-0 dark:bg-slate-800 dark:text-white"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      defaultMonth={field.value}
                      selected={field.value}
                      onSelect={field.onChange}
                      // disabled={(date) => date < new Date()}
                      initialFocus
                      className="bg-slate-50 dark:border-none dark:bg-slate-900 !m-0"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <div>
            <FormLabel>Tags</FormLabel>
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-5">
              <Input
                maxLength={20}
                placeholder={
                  inputTags.length >= 5 ? "Max. 5 tags" : "Motivation"
                }
                value={inputTagName}
                onChange={(e) =>
                  setInputTagName(capitalizeFirstLetter(e.target.value))
                }
                disabled={inputTags.length >= 5}
              />
              <div className="flex w-full gap-2 sm:justify-between">
                <Select
                  onValueChange={(color) => {
                    setInputTagColor(color);
                  }}
                  value={inputTagColor}
                  disabled={inputTagName.length === 0}
                >
                  <SelectTrigger
                    className={twMerge(
                      "w-full",
                      changeTagColor(inputTagColor),
                      inputTagColor ? "border-none" : ""
                    )}
                  >
                    <SelectValue placeholder="Color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      disabled={true}
                      key="inputTagColor"
                      value="inputTagColor"
                    >
                      Tag color
                    </SelectItem>
                    <Separator />
                    {tagColors.map((color) => (
                      <SelectItem
                        key={color}
                        className={twMerge(
                          "hover:opacity-100",
                          changeTagColor(color)
                        )}
                        value={color}
                      >
                        {inputTagName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <button
                  disabled={isAddBtnDisabled}
                  type="button"
                  onClick={() => {
                    if (validateInputTags() === VALIDATION_STATUS.PASS)
                      addTag();
                  }}
                  className={getButtonClasses(isAddBtnDisabled)}
                >
                  Add
                </button>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {inputTags.map((tag, i) => (
                <Badge
                  key={i}
                  onClick={() => removeTag(tag.name)}
                  className={twMerge(
                    "cursor-pointer border-none font-light hover:opacity-70",
                    changeTagColor(tag.color)
                  )}
                >
                  #{tag.name}
                  <MdClose className="ml-1 cursor-pointer rounded-full" />
                </Badge>
              ))}
              {inputTagName && (
                <Badge
                  className={twMerge(
                    "border-none font-light hover:opacity-70",
                    changeTagColor(inputTagColor)
                  )}
                >
                  #{inputTagName}
                </Badge>
              )}
            </div>
            <TagErrors tagErrors={tagErrors} />
          </div>

          <div className="flex items-center gap-3">
            <button
              aria-label="Save changes"
              type="submit"
              className="w-full cursor-pointer rounded-md bg-green-50 px-3 py-2.5 text-sm text-green-500 duration-300 ease-in hover:bg-green-100 dark:bg-green-700 dark:text-white  dark:hover:bg-green-600"
            >
              Save
            </button>
            <button
              aria-label="Cancel editing"
              onClick={() => setIsUpdateMode(false)}
              className="cursor-pointer rounded-md bg-red-50 px-3 py-2.5 text-sm text-red-500 duration-300 ease-in hover:bg-red-50 hover:text-red-500 dark:bg-red-700 dark:text-white dark:hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </Form>
      {isPending ? <LoadingCover spinnerSize="s" /> : null}
    </div>
  );
}
