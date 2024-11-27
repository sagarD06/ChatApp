import React from "react";

const Input = ({ inputName, type,value, className, state, setState }) => {
  return (
    <input
      type={type}
      value={value}
      placeholder={`Enter your ${inputName}`}
      className={`input input-bordered w-full h-10 ${className}`}
      onChange={(e)=> setState({...state, value : e.target.value})}
    />
  );
};

export default Input;
