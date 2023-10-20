import { TypeTagErrors } from "@/types/type";
import React from 'react'

const TagErrors = ({tagErrors}: {tagErrors: TypeTagErrors}) => {
  return (
    <div>
      {Object.keys(tagErrors).length > 0
        ? Object.keys(tagErrors).map((tagErrorName: string) => {
            return (
              <p
                key={tagErrorName}
                className="text-sm font-medium text-red-500"
              >
                {(tagErrors as { [key: string]: any })[tagErrorName].message}
              </p>
            );
          })
        : null}
    </div>
  );
}

export default TagErrors