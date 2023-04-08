// Imports
const mongoose = require("mongoose");

// User schema
const membersSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please add you'r fullname."],
    },
    phonenumber: {
      type: String,
      required: [true, "Please add you'r phonenumber."],
    },
    email: {
      type: String,
      required: [true, "Please add you'r email."],
    },
    team: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
    address: {
      type: String,
      required: [true, "Please add you'r address."],
    },
    emergencyContactName: {
      type: String,
      required: [true, "emergency contact is required."],
    },
    emergencyContactPhonenum: {
      type: String,
      required: [true, "emergency contact phone number is required."],
    },
    programs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Program" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Member", membersSchema);
