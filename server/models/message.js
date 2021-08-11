import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  message: String,
  name: String,
  phoneNumber: Number,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  status: String,
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
