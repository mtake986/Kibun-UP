import HeadingFive from "@/components/utils/HeadingFive";
import Image from "next/image";
import React from "react";

const TechStack = () => {
  return (
    <div>
      <HeadingFive text="Tech Used" className="text-violet-500 mb-1" />
      <div className="flex flex-wrap justify-between gap-3 rounded-lg bg-gray-50 sm:px-5 sm:py-4 px-3 py-2 sm:gap-5">
        <Image
          src="/assets/icons/react.svg"
          alt="React logo"
          width={32}
          height={32}
          className="h-5 w-5 sm:h-8 sm:w-8"
        />
        <Image
          src="/assets/icons/ts.svg"
          alt="TypeScript logo"
          width={32}
          height={32}
          className="h-5 w-5 sm:h-8 sm:w-8"
        />
        <Image
          src="/assets/icons/nextjs.svg"
          alt="Next.js logo"
          width={32}
          height={32}
          className="h-5 w-5 sm:h-8 sm:w-8"
        />
        <Image
          src="/assets/icons/twcss.svg"
          alt="Tailwind CSS logo"
          width={32}
          height={32}
          className="h-5 w-5 sm:h-8 sm:w-8"
        />
        <Image
          src="/assets/icons/firebase.svg"
          alt="Firebase logo"
          width={32}
          height={32}
          className="h-5 w-5 sm:h-8 sm:w-8"
        />
      </div>
    </div>
  );
};

export default TechStack;
