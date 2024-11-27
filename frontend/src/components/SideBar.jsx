import React from "react";

import Conversations from "./Conversations";
import ChatHeader from "./ChatHeader";
import LogoutButton from "./LogoutButton";

const SideBar = () => {
  return (
    <div className="w-[25%] border-r border-dark flex flex-col bg-neutral-300 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-25">
      <ChatHeader />
      <Conversations />
      <LogoutButton />
    </div>
  );
};

export default SideBar;
