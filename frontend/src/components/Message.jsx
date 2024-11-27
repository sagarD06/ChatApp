import React from "react";
import useConversation from "../zustand/useConversation";
import { useAuthContext } from "../context/AuthContext";
import { extractTime } from "../utils/extractTime";

const Message = ({ message }) => {
  const { user } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = user._id === message.senderId;
  const chatClassname = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? user.profilePic : selectedConversation.profilePic;
  const chatTime = extractTime(message.createdAt)

  const fromBg = fromMe ? "bg-buttonPrimary" : "";
  return (
    <div className={`chat ${chatClassname}`}>
      <div className="chat-image avatar">
        <div className="w-6 rounded-full">
          <img src={profilePic} alt="avatar" />
        </div>
      </div>
      <div className={`chat-bubble text-white pb-2 ${fromBg}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-neutral-200 text-xs flex gap-1 items-center">
        {chatTime}
      </div>
    </div>
  );
};

export default Message;
