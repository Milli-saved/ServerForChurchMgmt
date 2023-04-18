const asyncHandler = require("express-async-handler");
const Department = require("../models/departmentsModel");

// Add new Department
const addNewDepartment = asyncHandler(async (req, res) => {
  let department = await Department.create(req.body);
  if (department) {
    res.status(200).json(department);
  }
});

// Update Department
const updateDepartment = asyncHandler(async (req, res) => {
  const deparment = await Department.findById(req.params.id);
  if (!deparment) {
    res.status(400);
    throw new Error("No department found with this id.");
  }
  const updatedDept = await Department.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedDept);
});

// Delete Department
const deleteDepartment = asyncHandler(async (req, res) => {
  const deparment = await Department.findById(req.params.id);
  if (!deparment) {
    res.status(400);
    throw new Error("No department found with this id.");
  }
  await Department.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: "Department is deleted." });
});

// Get all departments
const getAllDepartments = asyncHandler(async (req, res) => {
  const department = await Department.find({});
  if (department) {
    res.status(200).json(department);
  }
});

// Get one department using id
const getOneDepartment = asyncHandler(async (req, res) => {
  const department = await Department.findById(req.params.id);
  if (department) {
    res.status(200).json(church);
  }
});

module.exports = {
  addNewDepartment,
  updateDepartment,
  deleteDepartment,
  getAllDepartments,
  getOneDepartment,
};
