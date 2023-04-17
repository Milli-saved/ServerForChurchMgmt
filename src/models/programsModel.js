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
    attendedMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
    numberOfAttendedMembers: {
      type: Number,
      default: 0,
    },
    programDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Program", programsSchema);
