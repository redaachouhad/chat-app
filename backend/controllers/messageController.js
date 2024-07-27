import Message from "../models/message.js";

export const sendMessage = async (req, res) => {
  const data = req.body;
  const createdMessage = new Message(data);
  try {
    const savedMessage = await createdMessage.save();
    res.status(200).send({ success: savedMessage });
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
