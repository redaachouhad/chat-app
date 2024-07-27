import mongoose from "mongoose";

const invitationSchema = new mongoose.Schema(
  {
    idSender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    usernameSender: {
      type: String,
      required: true,
    },
    emailSender: {
      type: String,
      required: true,
    },
    imageSender: {
      type: String,
    },
    idReceiver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    usernameReceiver: {
      type: String,
      required: true,
    },
    emailReceiver: {
      type: String,
      required: true,
    },
    imageReceiver: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Invitation =
  mongoose.models.Invitation || mongoose.model("Invitation", invitationSchema);

export default Invitation;
