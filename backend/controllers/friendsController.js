import Friends from "../models/friends.js";

export const addFriends = async (req, res) => {
  const item = req.body;
  const friends = {
    id1: item.idSender,
    email1: item.emailSender,
    username1: item.usernameSender,
    image1: item.imageSender,
    id2: item.idReceiver,
    email2: item.emailReceiver,
    username2: item.usernameReceiver,
    image2: item.imageReceiver,
  };
  const createNewFriends = new Friends(friends);
  try {
    await createNewFriends.save();
    res.status(200).json({ message: "Friendship added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error in adding friendship" });
  }
};

export const getFriends = async (req, res) => {
  const { id } = req.params;
  try {
    const friends = await Friends.find({ $or: [{ id1: id }, { id2: id }] });
    res.status(200).json({ message: friends });
  } catch (error) {
    res.status(500).json({ message: "Error in finding friends" });
  }
};

export const deleteFriend = async (req, res) => {
  const { id } = req.params;
  try {
    await Friends.deleteOne({ _id: id });
    res.status(200).json({ message: "Friendship deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "error in deleting friend" });
  }
};
