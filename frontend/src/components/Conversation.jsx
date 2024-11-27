import React from "react";
import Divider from "./Divider";
import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/SocketContext";

const Conversation = ({ conversation, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;

  const {onlineUsers} = useSocketContext();

  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        className={`flex items-center gap-2 ${
          isSelected && "bg-background"
        } hover:bg-background rounded p-3 py-2 cursor-pointer`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline && "online"}`}>
          <div className="w-12 rounded-full">
            <img
              src={conversation.profilePic}
              alt="User 1"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-dark">{conversation.fullname}</p>
            <span className="text-xl">🎃</span>
          </div>
        </div>
      </div>
      {!lastIdx && <Divider className={`my-0 py-0`} />}
    </>
  );
};

export default Conversation;
