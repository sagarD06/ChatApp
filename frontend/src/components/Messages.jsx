import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import axios from "axios";
import toast from "react-hot-toast";
import MessageSkeleton from "../components/MessageSkeleton";
import useConversation from "../zustand/useConversation";

const Messages = () => {
  const [loading, setLoading] = useState(false);
  const lastMessageRef = useRef();
  const { selectedConversation, messages, setMessages } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/v1/messages/${selectedConversation._id}`
        );
        if (response.data.success) {
          setMessages(response.data.messages);
        }
      } catch (error) {
        console.log(error);
        toast.error("Unable to retrieve conversations");
      } finally {
        setLoading(false);
      }
    };
    selectedConversation?._id && getMessages();
  }, [selectedConversation?._id, setMessages]);

  let timeOut = null;
  useEffect(() => {
    timeOut = setTimeout(
      () => lastMessageRef.current.scrollIntoView({ behavior: "smooth" }),
      100
    );

    return () => clearTimeout(timeOut);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center text-background">
          Send a message to start the conversation.
        </p>
      )}
    </div>
  );
};

export default Messages;
