import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import ButtonPrimary from "./buttonPrimary";
import Logo from "./Logo";
import Divider from "./Divider";
import GenderCheckbox from "./GenderCheckBox";
import Label from "./Label";
import { useAuthContext } from "../context/AuthContext";

const Signup = () => {
  const initialState = {
    fullname: "",
    username: "",
    gender: "",
    password: "",
    confirmPassword: "",
  };
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState(initialState);

  const { setUser } = useAuthContext();

  const handleCheckbox = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Am here");
    setLoading(true);
    const { fullname, username, gender, password } = inputs;
    if (
      !fullname ||
      !username ||
      !password ||
      !inputs.confirmPassword ||
      !gender
    ) {
      toast.error("All fields are required");
      return;
    }
    if (inputs.password !== inputs.confirmPassword) {
      toast.error("Passwords donot match");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/signup",
        {
          fullname,
          username,
          gender,
          password,
        }
      );
      if (response.data.success) {
        localStorage.setItem("chat-user", JSON.stringify(response.data.user));
        setUser(response.data.user);
        toast.success("Signup successful!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while signing up");
      return;
    } finally {
      setLoading(false);
      setInputs(initialState);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center w-full md:flex-1 bg-[url('https://w0.peakpx.com/wallpaper/818/148/HD-wallpaper-whatsapp-background-cool-dark-green-new-theme-whatsapp.jpg')] min-h-screen bg-cover bg-center p-5">
      <Logo />
      <div className="min-w-72 md:min-w-96 p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0">
        <h1 className="text-3xl text-center font-semibold text-dark">Signup</h1>
        <form className="form-control gap-1" onSubmit={handleSubmit}>
          <div>
            <Label labelName="Fullname" />
            <input
              type="text"
              value={inputs.fullname}
              placeholder="Enter you fullname"
              className={`input input-bordered w-full h-10`}
              onChange={(e) =>
                setInputs({ ...inputs, fullname: e.target.value })
              }
            />
          </div>
          <div>
            <Label labelName="Username" />
            <input
              type="text"
              value={inputs.username}
              placeholder="Enter you username"
              className={`input input-bordered w-full h-10`}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>
          <GenderCheckbox
            onCheckboxChange={handleCheckbox}
            selectedGender={inputs.gender}
          />
          <div>
            <Label labelName="Password" />
            <input
              type="password"
              value={inputs.password}
              placeholder="Enter your password"
              className={`input input-bordered w-full h-10`}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>
          <div>
            <Label labelName="Confirm password" />
            <input
              type="password"
              value={inputs.confirmPassword}
              placeholder="Confirm password"
              className={`input input-bordered w-full h-10`}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>
          <div className="mt-5">
            <ButtonPrimary title="Signup" loading={loading} />
          </div>
        </form>
        <Divider />
        <p className="text-center text-md">
          {" "}
          Already have an account?{" "}
          <Link to="/login" className="hover:text-background">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
