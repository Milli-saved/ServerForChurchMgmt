const mongoose = require("mongoose");

const churchSchema = mongoose.Schema(
  {
    churchName: {
      type: String,
      required: [true, "Chruch name is required."],
    },
    overAllNumberOfMembers: {
      type: Number,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Church", churchSchema);
