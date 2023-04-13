// Imports
const mongoose = require("mongoose");

// User schema
const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please add you'r fullname."],
    },
    roles: {
      type: String,
      required: [true, "Role is required."],
    },
    phonenumber: {
      type: String,
      required: [true, "Please add you'r phonenumber."],
    },
    username: {
      type: String,
      required: [true, "Please add you'r username."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
