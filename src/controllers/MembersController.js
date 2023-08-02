const asycnHandler = require("express-async-handler");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Member = require("../models/MembersModel");
const Access = require("../models/accessToUsers");

// Generating JWT
const generateToken = (id) => jwt.sign({ id }, "Marcil", { expiresIn: "1d" });

// Register member
const addNewMember = asycnHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    middleName,
    userName,
    password,
    phoneNumber,
    role,
    dateOfBirth,
    martialStatus,
    memberType,
    // churchName,
    // churchBranch,
  } = req.body;
  //checking username and password is not used.
  const userNameExists = await Member.findOne({ userName });
  const phoneNumberExists = await Member.findOne({ phoneNumber });

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
  console.log("checkdata", req.body.onlineMember);
  let member = await Member.create({
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    userName,
    password: hashedPassword,
    role,
    phoneNumber,
    martialStatus,
    onlineMember: memberType,
    // churchName,
    // churchBranch,
  });
  if (member) {
    let access = Access.create({
      member: member._id,
      canAddChurch: false,
      canAddMembers: false,
      canAddDepartment: false,
      canAddProgram: false,
    });
    res.status(201).json({
      member,
      token: generateToken(member._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Member data.");
  }
});

// Login
const login = asycnHandler(async (req, res) => {
  const { userName, password } = req.body;
  const member = await Member.findOne({ userName });
  if (member) {
    let checkPassword = await bcrypt.compare(password, member.password);
    if (checkPassword) {
      member.password = null;
      res.status(200).json({
        member,
        token: generateToken(member._id),
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

// Update member
const updateMemberProfile = asycnHandler(async (req, res) => {
  const member = await Member.findById(req.params.id);
  if (!member) {
    res.status(400);
    throw new Error("Can not find the requested member.");
  }

  let hashedPassword;
  if ("password" in req.body) {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
  }
  const updatedUser = await Member.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedUser);
});

// Delete member
const deleteMember = asycnHandler(async (req, res) => {
  const member = await Member.findById(req.params.id);
  if (!member) {
    res.status(400);
    throw new Error("Can not find the requested member.");
  }
  await Member.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: "Member is deleted." });
});

// Get all members
const getAllMembers = asycnHandler(async (req, res) => {
  const member = await Member.find({}).select("-password");
  if (member) {
    res.status(200).json({
      member,
    });
  }
});

const getAllMembersOfChurch = asycnHandler(async (req, res) => {
  const members = await Member.find({ churchName: req.body.churchName });
  if (members) {
    res.status(200).json(members);
  }
});

// Get one member
const getOneMember = asycnHandler(async (req, res) => {
  const member = await Member.findById(req.params.id).select("-password");
  if (member) {
    res.status(200).json({ member });
  }
});

module.exports = {
  addNewMember,
  login,
  updateMemberProfile,
  deleteMember,
  getAllMembers,
  getOneMember,
  getAllMembersOfChurch,
};
