const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          _id: user._id,
          role: user.role,
          username: username,
        },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: "24h",
        }
      );

      return res.status(200).json({
        userDetails: {
          _id: user._id,
          token: token,
          role: user.role,
        },
      });
    }
    return res.status(400).send("Invalid credentials. Please try again.");
  } catch (err) {
    return res.status(500).send("Something went wrong. Please try again.");
  }
};

module.exports = { Login };
