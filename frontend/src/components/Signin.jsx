import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import ButtonPrimary from "./buttonPrimary";
import Logo from "./Logo";
import Divider from "./Divider";
import Label from "./Label";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const Signin = () => {
  const initialState = {
    username: "",
    password: "",
  };
  const [inputs, setInputs] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const { setUser } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const { username, password } = inputs;
    if (!username || !password) {
      toast.error("All fields are required");
      return;
    }
    try {
      const response = await axios.post("/api/v1/auth/signin", {
        username,
        password,
      });
      if (response.data.success) {
        localStorage.setItem("chat-user", JSON.stringify(response.data.user));
        setUser(response.data.user);
        toast.success("Signin successful!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while signing in");
      return;
    } finally {
      setLoading(false);
      setInputs(initialState);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center w-full md:flex-1 bg-[url('https://w0.peakpx.com/wallpaper/818/148/HD-wallpaper-whatsapp-background-cool-dark-green-new-theme-whatsapp.jpg')] h-screen bg-cover bg-center">
      <Logo />
      <div className="min-w-72 md:min-w-96 p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0">
        <h1 className="text-3xl text-center font-semibold text-dark">Login</h1>
        <form className="form-control" onSubmit={handleSubmit}>
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
          <div className="mt-5">
            <ButtonPrimary title="Login" loading={loading} />
          </div>
        </form>
        <Divider />
        <p className="text-center text-md">
          {" "}
          Donot have an account?{" "}
          <Link to="/signup" className="hover:text-background">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
