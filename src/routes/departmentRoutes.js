const express = require("express");
const {
  addNewDepartment,
  updateDepartment,
  deleteDepartment,
  getAllDepartments,
  getOneDepartment,
} = require("../controllers/departmentController");
const router = express.Router();

router.route("/").post(addNewDepartment).get(getAllDepartments);
router
  .route("/:id")
  .put(updateDepartment)
  .delete(deleteDepartment)
  .get(getOneDepartment);

module.exports = router;
