import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

/******************************* SEND MESSAGE CONTROLLER *****************************/
export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { message } = req.body;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    await newMessage.save();

    if (newMessage) {
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }
    return res.status(201).json({
      message: "Message sent successfully",
      success: true,
      chatMessage: newMessage,
    });
  } catch (error) {
    console.log("Something went wrong in send message controller.");
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

/******************************* GET MESSAGES CONTROLLER *****************************/
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json({
        message: "No conversation yet",
        success: true,
        messages: [],
      });
    }
    return res.status(200).json({
      message: "Messages fetched successfully",
      success: true,
      messages: conversation.messages,
    });
  } catch (error) {
    console.log("Something went wrong in send message controller.");
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
