const mongoose = require("mongoose");

const churchSchema = mongoose.Schema(
  {
    churchName: {
      type: String,
      required: [true, "Chruch name is required."],
    },
    churchBranchName: {
      type: String,
      required: [true, "church branch name is required."],
    },
    churchLocation: {
      type: String,
      required: [true, "Church location is required."],
    },
    leadPastor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      reqyured: [true, "Name of Lead pastor is required."],
    },
    numberOfMembers: {
      type: Number,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Church", churchSchema);
