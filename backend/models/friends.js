import mongoose from "mongoose";

const friendsSchema = new mongoose.Schema(
  {
    id1: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    username1: {
      type: String,
      required: true,
    },
    email1: {
      type: String,
      required: true,
    },
    image1: {
      type: String,
    },
    id2: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    username2: {
      type: String,
      required: true,
    },
    email2: {
      type: String,
      required: true,
    },
    image2: {
      type: String,
    },
    lastMessage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Friends =
  mongoose.models.Friends || mongoose.model("Friends", friendsSchema);

export default Friends;
