"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { CalendarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { auth } from "@/config/Firebase";
import { eventSchema } from "@/form/schema";

import { useEvent } from "@/context/EventContext";
import HeadingTwo from "@/components/utils/HeadingTwo";
import UrlLink from "@/components/utils/UrlLink";
import { displayErrorToast } from "@/functions/displayToast";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import LoadingCover from "@/components/utils/LoadingCover";
import { twMerge } from "tailwind-merge";
import { ITag, TypeTagError, TypeTagErrors } from "@/types/type";
import { VALIDATION_STATUS, tagColors } from "@/data/CONSTANTS";
import { capitalizeFirstLetter } from "@/functions/capitalizeFirstLetter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { changeTagColor } from "@/functions/functions";
import { Badge } from "@/components/ui/badge";
import { MdClose } from "react-icons/md";
import TagErrors from "@/components/quoteCard/content/TagErrors";
import { Separator } from "@/components/ui/separator";

const getSubmitBtnClassName = (isSubmitBtnDisabled: boolean) => {
  if (isSubmitBtnDisabled) {
    return "w-full cursor-not-allowed rounded-md bg-gray-50 px-3 py-2.5 text-sm text-gray-500 dark:bg-slate-900";
  } else {
    return "w-full cursor-pointer rounded-md bg-green-50 px-3 py-2.5 text-sm text-green-500 duration-300 ease-in hover:bg-green-100 dark:bg-green-700 dark:text-white  dark:hover:bg-green-600";
  }
};

const isSubmitBtnDisabled = (
  form: UseFormReturn<
    {
      eventTitle: string;
      place: string;
      description: string;
      eventDate: Date;
      tags: ITag[];
    },
    any,
    undefined
  >
) => {
  return (
    form.formState.isSubmitting ||
    form.getValues().eventTitle === "" ||
    form.getValues().eventDate === undefined
  );
};

export default function RegisterForm() {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [inputTagName, setInputTagName] = useState("");
  const [inputTagColor, setInputTagColor] = useState<string>("");
  const [inputTags, setInputTags] = useState<ITag[]>([]);
  const [tagErrors, setTagErrors] = useState<TypeTagErrors>({});
  const isAddBtnDisabled =
    inputTagName.length <= 0 ||
    inputTagName.length > 20 ||
    inputTags.length >= 5 ||
    inputTags.some((tag) => tag.name === inputTagName);

  const { loginUser, fetchLoginUser } = useAuth();
  const { registerEvent } = useEvent();
  useEffect(() => {
    if (!loginUser) fetchLoginUser(auth.currentUser);
  }, [auth.currentUser]);

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
  const removeTag = (inputTagName: string) => {
    setInputTags(inputTags.filter((tag) => tag.name !== inputTagName));
  };

  const resetTagsWhenSubmitted = () => {
    setInputTags([]);
    setInputTagName("");
    setInputTagColor("");
    setTagErrors({});
    setIsPending(false);
  };

  const getAddButtonClass = (isDisabled: boolean) => {
    return isDisabled
      ? "cursor-not-allowed rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-500 dark:bg-gray-700 dark:text-white"
      : "cursor-pointer rounded-md bg-blue-50 px-3 py-2 text-sm text-blue-500 duration-300 ease-in hover:bg-blue-100 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-600";
  };
  // 1. Define your form.
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      eventTitle: "",
      place: "",
      description: "",
      eventDate: new Date(),
      tags: [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof eventSchema>) {
    if (loginUser) {
      setIsPending(true);
      values.tags = inputTags;
      registerEvent(values, loginUser.uid).then(() => {
        form.reset({
          eventTitle: "",
          place: "",
          description: "",
          eventDate: new Date(),
          tags: [],
        });
        resetTagsWhenSubmitted();
        setIsPending(false);
      });
    } else {
      displayErrorToast("Please log in.");
    }
  }

  return (
    <div className="px-5 pb-20 pt-10 sm:mb-32 sm:p-0">
      <HeadingTwo text="Register Form" />
      <div className={twMerge("relative", isPending ? "opacity-50" : "")}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="hidden sm:flex sm:flex-row sm:gap-8">
              <FormField
                control={form.control}
                name="eventTitle"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      Event Title<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="My Birthday"
                        {...field}
                        // defaultValue={field.value}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
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
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="eventTitle"
              render={({ field }) => (
                <FormItem className="w-full sm:hidden">
                  <FormLabel>
                    Event Title <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="My Birthday"
                      {...field}
                      // defaultValue={field.value}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="place"
              render={({ field }) => (
                <FormItem className="w-full sm:hidden">
                  <FormLabel>Place</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="My Parent's house (SLC, Utah)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

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
                    <PopoverContent
                      className="w-auto bg-white p-0 dark:bg-slate-800 dark:text-white"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {/* <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription> */}
                  <FormMessage className="text-red-500" />
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
                  <FormMessage className="text-red-500" />
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
                <div className="flex w-full gap-2 sm:justify-between sm:gap-2">
                  <Select
                    onValueChange={(color) => {
                      setInputTagColor(color);
                    }}
                    disabled={inputTagName.length === 0}
                    defaultValue="white"
                  >
                    <SelectTrigger className="w-full">
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
                          className={twMerge(changeTagColor(color))}
                          value={color}
                          placeholder="Color"
                        >
                          {inputTagName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    onClick={() => {
                      if (validateInputTags() === VALIDATION_STATUS.PASS)
                        addTag();
                    }}
                    disabled={isAddBtnDisabled}
                    className={getAddButtonClass(isAddBtnDisabled)}
                  >
                    Add
                  </Button>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {inputTags.map((tag, i) => (
                  <Badge
                    key={i}
                    onClick={() => removeTag(tag.name)}
                    className={twMerge(
                      "cursor-pointer border-none font-light",
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
                className={getSubmitBtnClassName(isSubmitBtnDisabled(form))}
                disabled={isSubmitBtnDisabled(form)}
                type="submit"
              >
                Submit
              </button>
              <UrlLink clickOn={<CloseBtn />} href="/event" target="_self" />
            </div>
          </form>
        </Form>
        {isPending ? <LoadingCover spinnerSize="s" /> : null}
      </div>
    </div>
  );
}

const CloseBtn = () => {
  const { toggleRegisterFormOpen } = useEvent();

  return (
    <button
      onClick={toggleRegisterFormOpen}
      className="cursor-pointer rounded-md bg-red-50 px-3 py-2.5 text-sm text-red-500 duration-300 ease-in hover:bg-red-100 dark:bg-red-700 dark:text-white  dark:hover:bg-red-600"
    >
      Close
    </button>
  );
};
