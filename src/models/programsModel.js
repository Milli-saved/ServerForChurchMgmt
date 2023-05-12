const mongoose = require("mongoose");

const programsSchema = mongoose.Schema(
  {
    programName: {
      type: String,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    attendedMembers: [
      {
        memberId: { type: mongoose.Schema.Types.ObjectId },
        memberName: { type: String },
        memberArrivedAt: { type: Date },
      },
    ],
    numberOfAttendedMembers: {
      type: Number,
      default: 0,
    },
    // leaveMembers
    absentMembers: [
      {
        memberId: { type: mongoose.Schema.Types.ObjectId },
        memberName: { type: String },
        reason: { type: String },
      },
    ],
    programDate: {
      type: Date,
    },
    programType: {
      type: String, // Permanent or Event
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Program", programsSchema);
