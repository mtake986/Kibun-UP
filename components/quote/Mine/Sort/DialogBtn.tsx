import { useQuote } from "@/app/context/QuoteContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SortDialogContent from "./Content";
import { FilterIcon } from "lucide-react";

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
      <DialogTrigger>
        <FilterIcon />
      </DialogTrigger>
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
