const mongoose = require("mongoose");

const Access = mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "member",
    },
    canAddChurch: {
      type: Boolean,
    },
    canAddMembers: {
      type: Boolean,
    },
    canAddDepartment: {
      type: Boolean,
    },
    canAddProgram: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Access", Access);
