import React, { useState } from "react";
import SearchInput from "./SearchInput";
import { IoLogoWechat } from "react-icons/io5";

const ChatHeader = () => {
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  return (
    <header className="h-16 bg-background w-full pl-3 py-3 flex justify-around items-center">
      <div
        className={`${
          isSearchClicked ? "hidden" : "flex"
        } gap-2 justify-start items-center`}
      >
        <IoLogoWechat size={"2em"} color="#00c245" />
        <h1 className="text-xl md:text-2xl font-bold text-white">Chat App</h1>
      </div>
      <SearchInput
        isSearchClicked={isSearchClicked}
        setIsSearchClicked={setIsSearchClicked}
      />
    </header>
  );
};

export default ChatHeader;
