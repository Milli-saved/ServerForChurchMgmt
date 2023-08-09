const mongoose = require("mongoose");

const churchBranchSchema = mongoose.Schema({
  church: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Church",
  },
  churchBranchName: {
    type: String,
  },
  churchBranchLocation: {
    type: String,
  },
  churchBranchLeadPastor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
  },
  churchMembersNumber: {
    type: Number,
  },
  approvalStatus: {
    type: Boolean,
  },
});

module.exports = mongoose.model("ChurchBranch", churchBranchSchema);
