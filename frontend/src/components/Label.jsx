import React from "react";

const Label = ({labelName}) => {
  return (
    <label className="label p-2">
      <span className="text-base label-text text-dark">{labelName}</span>
    </label>
  );
};

export default Label;
