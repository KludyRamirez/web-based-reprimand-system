const User = require("../../models/Users");
const bcrypt = require("bcryptjs");
const Notification = require("../../models/Notifications");

const changeEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const userData = req.user;

    console.log("email", email);

    const user = await User.findOne({ userName: userData.userName });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.email = email;

    await user.save();

    await Notification.create({
      userId: userData._id,
      message: `${userData.userName} has successfully changed his/her email`,
      createdAt: new Date(),
    });

    return res
      .status(200)
      .json({ message: "Your email has been updated successfully." });
  } catch (error) {
    console.error("Error updating email:", error);
    return res.status(500).json({ message: "Error updating email", error });
  }
};

const changePassword = async (req, res) => {
  try {
    const { password } = req.body;

    const userData = req.user;

    const newPassword = password;

    console.log(newPassword);
    const user = await User.findOne({ userName: userData.userName });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    await Notification.create({
      userId: userData._id,
      message: `${userData.userName} has successfully changed his/her password`,
      createdAt: new Date(),
    });

    return res
      .status(200)
      .json({ message: "Your password has been updated successfully." });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ message: "Error updating password", error });
  }
};

module.exports = { changeEmail, changePassword };
