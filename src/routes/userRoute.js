// Imports
const express = require("express");
const {
  registerUser,
  login,
  updateUserProfile,
  deleteUserProfile,
} = require("../controllers/userController");
const { checkToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// register user
router.route("/").post(registerUser);
router.post("/login", login);
router
  .route("/:id")
  .put(checkToken, updateUserProfile)
  .delete(checkToken, deleteUserProfile);

module.exports = router;
