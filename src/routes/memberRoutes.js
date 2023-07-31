// add new member
// update member profile
// delete memeber
// get all members
// get one member using ID

const express = require("express");
const {
  addNewMember,
  login,
  deleteMember,
  updateMemberProfile,
  getAllMembers,
  getOneMember,
  getAllMembersOfChurch,
} = require("../controllers/MembersController");

const router = express.Router();

router.route("/register").post(addNewMember);
router.route("/login").post(login);
router.route("/").get(getAllMembers).post(getAllMembersOfChurch);
router
  .route("/:id")
  .put(updateMemberProfile)
  .get(getOneMember)
  .delete(deleteMember);

module.exports = router;
