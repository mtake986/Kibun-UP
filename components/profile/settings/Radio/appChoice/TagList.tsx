"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { styleVariables } from "../../styles";
import { TypeLoginUser, TypeTagsQuotableAPI } from "@/types/type";

type Props = {
  updateTagForQuotableApi: (text: string) => void;
  loginUser: TypeLoginUser;
  tags: TypeTagsQuotableAPI[];
};

const TagList = ({ updateTagForQuotableApi, loginUser, tags }: Props) => {
  return (
    <div className="mt-2 flex w-full items-center justify-between">
      <Label className="text-xs">Select a tag</Label>
      <Select
        defaultValue={loginUser.settings.tagForQuotableApi}
        onValueChange={(value) => updateTagForQuotableApi(value)}
      >
        <SelectTrigger
          id="tags"
          className={`w-[150px] focus:outline-none focus:ring-transparent focus-visible:ring-transparent ${
            loginUser.settings.quoteTypeForHome === "appChoice"
              ? styleVariables.input
              : null
          }`}
        >
          <SelectValue placeholder="Select a Quote Tag" />
        </SelectTrigger>
        <SelectContent className="h-48  ">
          <SelectItem disabled={true} key="top" value="top" className="">
            Tag, # of quotes
          </SelectItem>
          <SelectItem key="random" value="random" className="">
            RANDOM
          </SelectItem>
          <Separator />
          {tags.map((tag: TypeTagsQuotableAPI) => (
            <SelectItem key={tag[0]} value={tag[0]} className="">
              {tag[0]}, {tag[1]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TagList;
