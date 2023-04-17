const express = require("express");
const {
  addNewProgram,
  updateProgram,
  deleteProgram,
  getAllPrograms,
  getOneProgram,
  attendedMembers,
  getAttendedMembers,
} = require("../controllers/programsController");
const router = express.Router();

router.route("/").post(addNewProgram).get(getAllPrograms);
router.route("/attendance/:id").post(attendedMembers).get(getAttendedMembers);
router
  .route("/:id")
  .get(getOneProgram)
  .put(updateProgram)
  .delete(deleteProgram);

module.exports = router;
