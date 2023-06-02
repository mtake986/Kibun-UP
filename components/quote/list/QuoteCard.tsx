import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BsFillPersonFill, BsChatLeftText } from "react-icons/bs";

type Props = {
  q: {
    createdAt: any;
    id: string;
    person: string;
    quote: string;
    uid: string;
  };
};

const QuoteCard = ({ q }: Props) => {
  console.log(q);
  return (
    <Card>
      <CardHeader>
        {/* <CardTitle>Card Title</CardTitle> */}
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-5">
          <BsFillPersonFill size={24} />
          <p>{q.person}</p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-5">
          <BsChatLeftText size={24} />
          <p>Card Footer</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default QuoteCard;
