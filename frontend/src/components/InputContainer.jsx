import React from "react";
import Label from "./Label";
import Input from "./Input";
import { set } from "mongoose";

const InputContainer = ({ name, type, value, state, setState }) => {
  return (
    <div>
      <Label labelName={name} />
      <Input
        inputName={name.toLowerCase()}
        type={type}
        value={value}
        state={state}
        setState={setState}
      />
    </div>
  );
};

export default InputContainer;
