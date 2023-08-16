import React from 'react'
import HeadingTwo from './HeadingTwo';

type Props = {
  text: string
}
const NoFetchedData = ({text}: Props) => {
  return (
    <div className="mt-10">
      <HeadingTwo text={text} />
    </div>
  );
}

export default NoFetchedData