import UrlLink from "@/components/utils/UrlLink";

const NoEventAvailable = () => {
  return (
    <div className="flex h-64 flex-col items-center justify-center rounded-none sm:rounded-lg bg-violet-50 p-12 text-center dark:bg-slate-900">
      <UrlLink
        href="/event"
        className="cursor-pointer text-blue-400 underline underline-offset-2 duration-300 hover:opacity-70"
        target="_self"
        clickOn="You have no events yet."
      />
    </div>
  );
};

export default NoEventAvailable;
