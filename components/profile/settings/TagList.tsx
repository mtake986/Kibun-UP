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
import { styleVariables } from "./styles";
import { TypeUserFromFirestore, TypeTagsQuotableAPI } from "@/types/type";
import { useAuth } from "@/context/AuthContext";
import LoadingSpinnerS from "@/components/utils/LoadingSpinnerS";
import useFetchTags from "@/components/hooks/useFetchTags";

type Props = {
  loginUser: TypeUserFromFirestore;
};

const TagList = ({ loginUser }: Props) => {
  const { updateTagForQuotableApi } = useAuth();
  const { tags, error, isPending } = useFetchTags();

  if (isPending) {
    return <LoadingSpinnerS />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mt-2 flex flex-col ">
      <Label className="mb-1 text-left text-xs">Select a tag</Label>
      <Select
        defaultValue={loginUser.settings.tagForQuotableApi}
        onValueChange={(value) => updateTagForQuotableApi(value)}
      >
        <SelectTrigger
          id="tags"
          className="w-full max-w-[200px] focus:outline-none focus:ring-transparent focus-visible:ring-transparent"
        >
          <SelectValue placeholder="Select a Quote Tag" />
        </SelectTrigger>
        <SelectContent className="h-48">
          <SelectItem disabled={true} key="top" value="top">
            Tag - # of quotes
          </SelectItem>
          <SelectItem key="random" value="random">
            RANDOM
          </SelectItem>
          <Separator />
          {tags?.map((tag: TypeTagsQuotableAPI, i: number) => (
            <SelectItem key={i} value={tag.name}>
              {tag.name} - {tag.quoteCount}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TagList;
