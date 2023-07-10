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
    <div className="w-[100px]">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="Target-On">Target-On</SelectItem>
          <SelectItem value="Target-Off">Target-Off</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default Tabs