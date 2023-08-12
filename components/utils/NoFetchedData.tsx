import React from 'react'

type Props = {
  text: string
}
const NoFetchedData = ({text}: Props) => {
  return (
    <div className="mt-10">
      <h2 className="mb-2 mt-4 text-center text-2xl">{text}</h2>
    </div>
  );
}

export default NoFetchedData