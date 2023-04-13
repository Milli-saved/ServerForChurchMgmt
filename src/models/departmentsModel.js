const mongoose = require("mongoose");

const deparmentSchema = mongoose.Schema({}, { timestamps: true });

module.exports = mongoose.model("Department", deparmentSchema);
