const mongoose = require("mongoose");

const churchBranchSchema = mongoose.Schema({});

module.exports = mongoose.model("ChurchBranch", churchBranchSchema);
