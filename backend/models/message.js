import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    idSender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    usernameSender: {
      type: String,
      required: true,
    },
    idReceiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    usernameReceiver: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;
