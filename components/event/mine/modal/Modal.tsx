import { Settings } from "lucide-react";
import React from "react";
import {
  DialogClose,
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { displayErrorToast } from "@/functions/displayToast";
import Sort from "./sort/Sort";
import { useEvent } from "@/context/EventContext";
import Filter from "./filter/Filter";
import { Button } from "@/components/ui/button";

const Modal = () => {
  const {
    getLoginUserEventsWithSort,
    resetSortFilterVariablesForMyEvents,
    isSortFilterVariablesForMyEventsDefault,
    checkSortFilterVariablesForMyEventsDefault,
    AreMyPastEventsRemoved,
  } = useEvent();

  return (
    <Dialog>
      <DialogTrigger className="relative">
        {!isSortFilterVariablesForMyEventsDefault || AreMyPastEventsRemoved ? (
          <div className="absolute right-0 top-0 h-1 w-1 rounded-full bg-red-500"></div>
        ) : null}
        <Settings className="h-6 w-6 cursor-pointer p-1 duration-300 ease-in hover:rotate-45 hover:opacity-70" />
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-slate-950">
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            try {
              getLoginUserEventsWithSort();
              checkSortFilterVariablesForMyEventsDefault();
            } catch (error) {
              displayErrorToast(error);
            }
          }}
        >
          <div className="flex flex-col gap-3">
            <Filter />
            <Sort />
          </div>
          <div className="flex items-center gap-3">
            <Button type="submit" className="w-full">
              Update
            </Button>
            <Button
              className="w-full"
              type="reset"
              onClick={() => {
                resetSortFilterVariablesForMyEvents();
              }}
            >
              Reset
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
