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
import { TypeLoginUser } from "@/types/type";
import useFetchTags from "@/components/hooks/useFetchTags";

type Props = {
  updateTagForQuotableApi: (text: string) => void;
  loginUser: TypeLoginUser;
  tags: string[];
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
          <SelectItem
            key="random"
            value="random"
            className=""
          >
            RANDOM
          </SelectItem>
          <Separator />
          {tags.map((tag: string) => (
            <SelectItem
              key={tag}
              value={tag}
              className=""
            >
              {tag}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TagList;
