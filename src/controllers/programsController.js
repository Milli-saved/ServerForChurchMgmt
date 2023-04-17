const asycnHandler = require("express-async-handler");
const Program = require("../models/programsModel");

const addNewProgram = asycnHandler(async (req, res) => {
  let program = await Program.create(req.body);
  if (program) {
    res.status(200).json(program);
  }
});

const updateProgram = asycnHandler(async (req, res) => {
  let program = await Program.findById(req.params.id);
  if (!program) {
    res.status(400);
    throw new Error("No program found with this id.");
  }
  const updatedProgram = await Program.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedProgram);
});

const deleteProgram = asycnHandler(async (req, res) => {
  let program = await Program.findById(req.params.id);
  if (!program) {
    res.status(400);
    throw new Error("No program found with this id.");
  }
  await Program.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: "Program is deleted." });
});

const getAllPrograms = asycnHandler(async (req, res) => {
  const program = await Program.find({});
  if (program) {
    res.status(200).json(program);
  }
});
const getOneProgram = asycnHandler(async (req, res) => {
  const program = await Program.findById(req.params.id);
  if (program) {
    res.status(200).json(program);
  }
});

module.exports = {
  addNewProgram,
  updateProgram,
  deleteProgram,
  getOneProgram,
  getAllPrograms,
};
