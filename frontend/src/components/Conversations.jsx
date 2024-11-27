import React, { useEffect, useState } from "react";
import Conversation from "./Conversation";
import axios from "axios";

const Conversations = () => {
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/v1/users/", {
        withCredentials: true,
      });
      console.log(response.data);
      if (response.data.success) {
        setConversations(response.data.users);
      }
    })();
  }, []);
  return (
    <div className="flex flex-col py-2 overflow-auto">
      {conversations.map((conversation, idx) => (
        <Conversation
          conversation={conversation}
          lastIdx={idx === conversation.lengh - 1}
          key={conversation._id}
        />
      ))}
    </div>
  );
};

export default Conversations;
