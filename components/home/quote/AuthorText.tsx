import { IQuote } from "@/types/type";
import React from 'react'

type Props = {
  quote: IQuote;
}
const AuthorText = ({quote} : Props) => {
  return <span>by {quote?.person}</span>;
}

export default AuthorText