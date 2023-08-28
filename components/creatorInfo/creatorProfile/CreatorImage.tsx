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
      className="m-auto h-32 w-32 rounded-full object-cover  object-center sm:h-48 sm:w-48"
    />
  );
}

export default CreatorImage