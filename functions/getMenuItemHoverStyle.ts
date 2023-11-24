export function getMenuItemHoverStyle(pathname: string, link: string) {
  return `text-violet-500 dark:text-white ${
    pathname === link
      ? "font-bold underline underline-offset-2"
      : "relative block w-fit after:absolute after:bottom-0.5 after:block after:h-[1px] after:w-full after:origin-center after:scale-x-0 after:bg-violet-500 after:transition after:duration-300 after:content-[''] after:hover:scale-x-100 dark:after:bg-white"
  }`;
}
