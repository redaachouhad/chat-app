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
    const people = await User.find({ _id: { $ne: id } });
    res.status(200).json({ message: people });
  } catch (error) {
    res.status(500).json({ message: "Error in finding people" });
  }
};
