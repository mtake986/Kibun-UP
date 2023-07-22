import React, { useRef, useState } from "react";

import { Input } from "@/components/ui/input";

const SearchBar = () => {
  const reference = useRef("initial value");
  const [searchText, setSearchText] = useState<string>('searchText');
  return (
    <Input
      type="email"
      placeholder="Search"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
  );
};

export default SearchBar;
