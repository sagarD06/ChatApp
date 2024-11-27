import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import axios from "axios";

const MessageInput = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { selectedConversation, messages, setMessages } = useConversation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!message) return;
      const response = await axios.post(
        `/api/v1/messages/send/${selectedConversation._id}`,
        { message }
      );
      if (response.data.success) {
        toast.success("Message sent successfully");
        setMessages([...messages, response.data.chatMessage]);
        setMessage("");
      }
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      className="px-4 my-3 relative self-center w-[80%]"
      onSubmit={handleSubmit}
    >
      <div className="w-full">
        <input
          type="text"
          value={message}
          placeholder="Message..."
          className="input input-bordered h-10 text-sm border rounded-lg w-full p-2.5 block text-dark bg-neutral-300"
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="absolute inset-y-0 end-0 flex items-center pe-10"
      >
        {loading ? <div className="loading loading-spinner" /> : <BsSend />}
      </button>
    </form>
  );
};

export default MessageInput;
