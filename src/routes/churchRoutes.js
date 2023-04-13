const express = require("express");
const {
  addNewChurch,
  updateChurch,
  deleteChurch,
  getChurchs,
  getOneChurch,
} = require("../controllers/churchController");
const router = express.Router();

router.route("/").get(getChurchs).post(addNewChurch);
router.route("/:id").put(updateChurch).delete(deleteChurch).get(getOneChurch);

module.exports = router;
