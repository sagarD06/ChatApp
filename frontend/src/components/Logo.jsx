import React from "react";
import { IoLogoWechat } from "react-icons/io5";

const Logo = () => {
  return (
    <div className="bg-transparent mb-3 flex  flex-col justify-center items-center md:hidden">
      <div className="flex gap-2 items-center">
        <IoLogoWechat size={"3em"} color="#00c245" />
        <h1 className="text-4xl md:text-6xl font-bold text-white">Chat App</h1>
      </div>
      <p className="text-sm md:text-base text-background">Stay connected to your loved ones.</p>
    </div>
  );
};

export default Logo;
