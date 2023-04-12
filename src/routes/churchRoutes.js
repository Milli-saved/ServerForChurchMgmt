const express = require("express");
const {
  addNewChurch,
  updateChurch,
  deleteChurch,
  getChurchs,
} = require("../controllers/churchController");
const router = express.Router();

router.route("/").get(getChurchs).post(addNewChurch);
router.route("/:id").put(updateChurch).delete(deleteChurch);

module.exports = router;
