import React, { Suspense } from "react";
import Register from "../../components/quote/register/Register";
import List from "@/components/quote/list/List";

const QuoteHomePage = () => {
  return (
    <div>
      <h1>QuoteHomePage</h1>
      <Register />
      <List />
    </div>
  );
};

export default QuoteHomePage;
