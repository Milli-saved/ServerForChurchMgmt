const express = require("express");
const {
  addNewProgram,
  updateProgram,
  deleteProgram,
  getAllPrograms,
  getOneProgram,
  attendedMembers,
} = require("../controllers/programsController");
const router = express.Router();

router.route("/").post(addNewProgram).get(getAllPrograms);
router.route("/attendance").post(attendedMembers);
router
  .route("/:id")
  .get(getOneProgram)
  .put(updateProgram)
  .delete(deleteProgram);

module.exports = router;
