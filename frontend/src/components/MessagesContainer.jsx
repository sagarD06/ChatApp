import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import useConversation from "../zustand/useConversation";

const MessagesContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    //unmounting logic..
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="flex flex-col flex-1 bg-[url('https://w0.peakpx.com/wallpaper/818/148/HD-wallpaper-whatsapp-background-cool-dark-green-new-theme-whatsapp.jpg')] h-screen bg-cover bg-center">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <header className="h-16 bg-darker text-neutral-200 w-full pl-3 py-3 flex items-center bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0">
            to: {selectedConversation.fullname}
          </header>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessagesContainer;

const NoChatSelected = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col items-center gap-2 text-center sm:text-lg md:text-xl text-gray-200">
        <p>Hello.. User</p>
        <p>please select a convesation to chat.</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
