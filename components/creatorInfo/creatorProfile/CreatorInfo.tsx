import React from "react";
import Sns from "../sns/Sns";
import CreatorProfile from "./CreatorProfile";
import HeadingTwo from "../../utils/HeadingTwo";

const CreatorInfo = () => {
  return (
    <div>
      <HeadingTwo text="Creator Info" />
      <CreatorProfile />
      <Sns />
    </div>
  );
};

export default CreatorInfo;
