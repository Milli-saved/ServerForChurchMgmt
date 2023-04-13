const mongoose = require("mongoose");

const deparmentSchema = mongoose.Schema(
  {
    departmentName: {
      type: String,
      required: [true, "Department Name is required."],
    },
    departmentLeaders: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
    ],
    departmentWeeklyProgram: {
      type: Date,
      required: [true, "Weekly progam days are required."],
    },
    departmentMembers: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Department", deparmentSchema);
