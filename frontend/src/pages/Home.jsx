import React from "react";


import SideBar from "../components/SideBar";
import MessagesContainer from "../components/MessagesContainer";

const Home = () => {
  return (
    <div className="transition-all duration-500 ease-in-out flex min-h-screen w-full">
      <SideBar />
      <MessagesContainer />
    </div>
  );
};

export default Home;
