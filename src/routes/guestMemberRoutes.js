const express = require("express");
const {
  addNewGuest,
  deleteGuest,
  getAllGuests,
} = require("../controllers/guestMemberController");

const router = express.Router();

router.route("/").post(addNewGuest).get(getAllGuests);
router.route("/:id").delete(deleteGuest);

module.exports = router;
