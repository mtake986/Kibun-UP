import React, { Suspense } from "react";
import Register from "../../components/quote/register/Register";
import List from "@/components/quote/list/List";

const QuoteHomePage = () => {
  return (
    <div>
      <Register />
      <List />
    </div>
  );
};

export default QuoteHomePage;
