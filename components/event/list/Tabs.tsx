import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Tabs = () => {
  return (
    <div className="w-[150px]">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">
            All
          </SelectItem>
          <SelectItem value="Target-On">Primary</SelectItem>
          <SelectItem value="Target-Off">Sub</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default Tabs