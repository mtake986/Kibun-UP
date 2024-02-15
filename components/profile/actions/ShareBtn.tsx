import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ShareBtn = () => {
  return (
    // <div
    //   className="flex-grow cursor-pointer gap-2 bg-slate-50 px-3 py-1 text-sm hover:opacity-70 dark:bg-slate-900"
    // >
    //   <span className="text-xs">Share</span>
    // </div>
    <Dialog>
      <DialogTrigger className="text-xs flex-grow cursor-pointer gap-2 bg-slate-50 px-3 py-1 hover:opacity-70 dark:bg-slate-900">
        Share
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ShareBtn;
