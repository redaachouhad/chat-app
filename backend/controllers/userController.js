import Friends from "../models/friends.js";
import Invitation from "../models/invitation.js";
import User from "../models/users.js";

export const addUsers = async (req, res) => {
  try {
    const data = req.body;
    let foundUser = await User.findOne({ email: data.email });
    if (!foundUser) {
      const createNewUser = new User({
        email: data.email,
        username: data.username,
        image: data.image,
      });
      try {
        const savedUser = await createNewUser.save();
        foundUser = savedUser;
      } catch (error) {
        res.status(500).json({ message: "Error in registering a user" });
      }
    }
    res.status(200).json({ message: foundUser });
  } catch (error) {
    res.status(500).json({ message: "Error in finding user" });
  }
};

export const findPeople = async (req, res) => {
  const { id } = req.params;
  try {
    let listInvitations = await Invitation.find(
      {
        $or: [{ idSender: id }, { idReceiver: id }],
      },
      { idSender: true, idReceiver: true }
    );
    let listInvitationsId = listInvitations.map((item) => {
      if (item.idSender == id) {
        return item.idReceiver;
      } else {
        return item.idSender;
      }
    });

    let listOfFriends = await Friends.find(
      {
        $or: [{ id1: id }, { id2: id }],
      },
      {
        id1: true,
        id2: true,
      }
    );
    let listOfFriendsId = listOfFriends.map((item) => {
      if (item.id1 == id) {
        return item.id2;
      } else {
        return item.id1;
      }
    });

    const listInvitationsIdAndListOfFriendsId =
      listInvitationsId.concat(listOfFriendsId);

    let people = await User.find({
      _id: { $nin: listInvitationsIdAndListOfFriendsId, $ne: id },
    });
    res.status(200).json({ message: people });
  } catch (error) {
    res.status(500).json({ message: "Error in finding people" });
  }
};
