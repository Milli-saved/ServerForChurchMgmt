// Imports
const mongoose = require("mongoose");

// User schema
const membersSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Frist name is required."],
    },
    middleName: {
      type: String,
      required: [true, "Middle name is required."],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of Birth is required."],
    },
    userName: {
      type: String,
      required: [true, "Please add you'r username."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    role: {
      type: String,
      required: [true, "Role is required."],
    },
    phoneNumber: {
      type: Number,
      required: [true, "Phone number is required."],
    },
    martialStatus: {
      type: String,
      required: [true, "Martial status is required."],
    },
    spouseFullName: {
      type: String,
    },
    numberOfChildren: {
      type: Number,
    },
    childrensFullName: [{ type: String }],
    address: {
      city: {
        type: String,
      },
      subCity: {
        type: String,
      },
      wereda: {
        type: Number,
      },
      houseNumber: {
        type: String,
      },
    },
    specificAddressName: {
      type: String,
    },
    emergencyContactFullName: {
      type: String,
    },
    emergencyContactPhonenumber: {
      type: Number,
    },
    baptized: {
      type: Boolean,
    },
    previousChurchName: {
      type: String,
    },
    previousChurchBranch: {
      type: String,
    },
    previousTeams: [{ type: String }],
    knowOfOurChurch: [{ type: String }],
    timeOfArrival: {
      type: Date,
    },
    learningDicipleshipClass: {
      type: Boolean,
    },
    deparment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Deparment" }],
    academicStatus: {
      type: String,
    },
    profession: {
      type: String,
    },
    workingInCompany: {
      type: String,
    },
    skills: [{ type: String }],
    languages: [{ type: String }],
    vision: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Member", membersSchema);
