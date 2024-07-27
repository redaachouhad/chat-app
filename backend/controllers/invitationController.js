import Invitation from "../models/invitation.js";

export const sendInvitation = async (req, res) => {
  const data = req.body;
  const newInvitation = new Invitation(data);
  try {
    await newInvitation.save();
    const listOfSentInvitations = await Invitation.find({
      idSender: data.idSender,
    });
    res.status(200).send({ message: listOfSentInvitations });
  } catch (error) {
    res.status(500).send({ message: [] });
  }
};

export const getSentInvitation = async (req, res) => {
  const { id } = req.params;
  try {
    const listOfSentInvitations = await Invitation.find({ idSender: id });
    res.status(200).json({ message: listOfSentInvitations });
  } catch (error) {
    res.status(500).json({ message: "Error of finding sent invitation" });
  }
};

export const deleteSentInvitation = async (req, res) => {
  const { id } = req.params;
  try {
    await Invitation.deleteOne({ _id: id });
    res.status(200).json({ message: "Sent invitation deleted" });
  } catch (error) {
    res.status(500).json({ message: "error in deleting the invitation" });
  }
};

export const getReceiveInvitation = async (req, res) => {
  const { id } = req.params;
  try {
    const listOfReceiveInvitations = await Invitation.find({ idReceiver: id });
    res.status(200).json({ message: listOfReceiveInvitations });
  } catch (error) {
    res.status(500).json({ message: "Error of finding sent invitation" });
  }
};

export const deleteReceivedInvitation = async (req, res) => {
  const { id } = req.params;
  try {
    await Invitation.deleteOne({ _id: id });
    res.status(200).json({ message: "Sent invitation deleted" });
  } catch (error) {
    res.status(500).json({ message: "error in deleting the invitation" });
  }
};
