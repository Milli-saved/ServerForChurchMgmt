const express = require("express");
const {
  addNewChurchBranch,
  updateChurchBranch,
  deleteChurchBranch,
  getBranchesOfChurch,
  getOneChurchBranch,
} = require("../controllers/churchBranchController");
const router = express.Router();

router.route("/getallbranches").post(getBranchesOfChurch);
router.route("/addnewbranch").post(addNewChurchBranch);
router
  .route("/:id")
  .put(updateChurchBranch)
  .delete(deleteChurchBranch)
  .get(getOneChurchBranch);

module.exports = router;
