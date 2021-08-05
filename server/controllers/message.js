import Message from "../models/message.js";
import mongoose from "mongoose";

export const saveMessage = async (req, res) => {
  const message = req.body;
  const newMessage = new Message({
    ...message,
    createdAt: new Date().toISOString(),
  });
  try {
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getMessage = async (req, res) => {
  const messages = await Message.find().sort({ _id: -1 });
  try {
    res.status(201).json(messages);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
