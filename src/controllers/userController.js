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
    phonenumber,
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

// @desc logs in the user
// @route POST /api/users/login
// @access Public
const login = asycnHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    let checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      res.status(200).json({
        _id: user._id,
        username: user.username,
        phonenumber: user.phonenumber,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Incorrect Password.");
    }
  } else {
    res.status(400);
    throw new Error("Incorrect Username.");
  }
});

// @desc let's the user update their profile.
// @route POST /api/users/:id
// @access Public
const updateUserProfile = asycnHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(400);
    throw new Error("No user is found.");
  }
  let hashedPassword;
  if ('password' in req.body) {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(req.body.password, salt);
  }
  req.body.password = hashedPassword;
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedUser);
});

// @desc let's the user delete their profile.
// @route POST /api/users/:id
// @access Public
const deleteUserProfile = asycnHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("You are not logged in.");
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: "User deleted successfully." });
});

module.exports = {
  registerUser,
  login,
  updateUserProfile,
  deleteUserProfile,
};
