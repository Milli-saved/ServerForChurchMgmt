// Imports
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asycnHandler = require("express-async-handler");
const User = require("../models/userModel");

// Generating JWT
const generateToken = (id) => jwt.sign({ id }, "Marcil", { expiresIn: "1d" });

// @desc Registering new user
// @route POST /api/users
// @access Public
const registerUser = asycnHandler(async (req, res) => {
  const { fullname, username, password, roles, phonenumber } = req.body;
  if (!fullname || !username || !password || !roles || !phonenumber) {
    res.status(400);
    throw new Error("Please add all fields.");
  }

  // Check if username & phonenumber is used.
  const userNameExists = await User.findOne({ username });
  const phoneNumberExists = await User.findOne({ phonenumber });

  if (userNameExists) {
    res.status(409);
    throw new Error(`User name ${username} is already used.`);
  }
  if (phoneNumberExists) {
    res.status(409);
    throw new Error(`Phone number ${phonenumber} is already used.`);
  }

  // Hashing the Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  let user = await User.create({
    fullname,
    username,
    roles,
    phonenuber,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      fullname: user.fullname,
      roles: user.roles,
      phonenumber: user.phonenumber,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

module.exports = {
  registerUser,
};
