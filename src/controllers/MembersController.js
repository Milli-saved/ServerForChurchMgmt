const asycnHandler = require("express-async-handler");
const Member = require("../models/membersModel");

// Generating JWT
const generateToken = (id) => jwt.sign({ id }, "Marcil", { expiresIn: "1d" });

// Register member
const addNewMember = asycnHandler(async (req, res) => {
  //checking username and password is not used.
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
  let member = await Member.create({
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    userName,
    password: hashedPassword,
    roles,
    phoneNumber,
  });
  if (member) {
    res.status(201).json({
      _id: member.id,
      firstName: member.firstName,
      middleName: member.middleName,
      lastName: member.lastName,
      dateOfBirth: member.dateOfBirth,
      userName: member.userName,
      roles: member.roles,
      phoneNumber: member.phoneNumber,
      token: generateToken(member._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Member data.");
  }
});

// Login
const login = asycnHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await Member.findOne({ username });
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
  const member = await Member.find({});
  if (member) {
    res.status(200).json({
      member,
    });
  }
});

// Get one member
const getOneMember = asycnHandler(async (req, res) => {
  const member = await Member.findById(req.params.id);
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
};
