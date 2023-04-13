const mongoose = require("mongoose");

const programsSchema = mongoose.Schema({}, { timestamps: true });

module.exports = mongoose.model("Program", programsSchema);
