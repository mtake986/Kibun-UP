import Image from 'next/image';
import React from 'react'
import creatorPicture from "../../../public/assets/images/creatorPicture.jpg";

const CreatorImage = () => {
  return (
    <Image
      src={creatorPicture}
      alt="Creator Profile Picture"
      width={400}
      height={400}
      className="m-auto h-40 w-40 rounded-full object-cover  object-center sm:h-60 sm:w-60"
    />
  );
}

export default CreatorImage