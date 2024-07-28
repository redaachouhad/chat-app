import Friends from "../models/friends.js";
import Message from "../models/message.js";

export const sendMessage = async (req, res) => {
  const data = req.body;
  const createdMessage = new Message(data);
  try {
    const savedMessage = await createdMessage.save();
    await Friends.updateOne(
      {
        $or: [
          {
            id1: savedMessage.idSender,
            id2: savedMessage.idReceiver,
          },
          {
            id2: savedMessage.idSender,
            id1: savedMessage.idReceiver,
          },
        ],
      },
      {
        $set: { lastMessage: savedMessage.message },
      }
    );
    const listOfFriends = await Friends.find({
      $or: [{ id1: savedMessage.idSender }, { id2: savedMessage.idSender }],
    }).sort({ updatedAt: -1 });

    res
      .status(200)
      .send({ savedMessage: savedMessage, listOfFriends: listOfFriends });
  } catch (error) {
    res.status(500).send({ message: "Error in sending message" });
  }
};

export const getAllMessages = async (req, res) => {
  const data = req.body;
  try {
    const messagesList = await Message.find({
      $or: [
        { idSender: data.id1, idReceiver: data.id2 },
        { idSender: data.id2, idReceiver: data.id1 },
      ],
    }).sort({ createdAt: 1 });
    res.status(200).json({ message: messagesList });
  } catch (error) {
    res.status(500).json({ message: "Error in getting messages" });
  }
};
