import React from "react";
import { IoLogoWechat } from "react-icons/io5";
import Signup from "../components/Signup";
import Signin from "../components/Signin";

const AuthPage = ({ page }) => {
  return (
    <div className="min-h-screen w-full flex">
      <div className="hidden md:w-[50%] bg-background md:flex  flex-col justify-center items-center">
        <div className="flex gap-2 items-center">
          <IoLogoWechat size={"4em"} color="#00c245" />
          <h1 className="text-5xl font-bold text-white">Chat App</h1>
        </div>
        <p className="text-base text-dark">
          Stay connected to your loved ones.
        </p>
      </div>
      {page === "signup" ? <Signup /> : <Signin />}
    </div>
  );
};

export default AuthPage;
