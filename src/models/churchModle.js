const mongoose = require("mongoose");

const churchSchema = mongoose.Schema(
  {
    churchName: {
      type: String,
      required: [true, "Chruch name is required."],
    },
    leadPastor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    },
    overAllNumberOfMembers: {
      type: Number,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Church", churchSchema);
