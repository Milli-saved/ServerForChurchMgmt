const express = require("express");
const { checkToken } = require("../middlewares/authMiddleware");
const {
  addNewProgram,
  updateProgram,
  deleteProgram,
  getAllPrograms,
  getOneProgram,
  attendedMembers,
  getAttendedMembers,
  leaveRequest,
  absentMembersbyLeaveReq,
} = require("../controllers/programsController");
const router = express.Router();

router.route("/").post(addNewProgram).get(getAllPrograms);
router
  .route("/attendance/:id")
  .post(checkToken, attendedMembers)
  .get(checkToken, getAttendedMembers);
router.route("/absent/:id").get(absentMembersbyLeaveReq).post(leaveRequest);
router
  .route("/:id")
  .get(getOneProgram)
  .put(updateProgram)
  .delete(deleteProgram);

module.exports = router;
