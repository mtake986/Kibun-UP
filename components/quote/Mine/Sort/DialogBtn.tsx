import { useQuote } from "@/app/context/QuoteContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SortDialogContent from "./Content";

const SortBtn = () => {
  const {
    searchTagForMine,
    setSearchTagForMine,
    fetchFilteredMyQuotes,
    getLoginUserQuotes,
    loginUserQuotes,
    setSortByElement,
  } = useQuote();

  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sort</DialogTitle>
          <SortDialogContent />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SortBtn;
