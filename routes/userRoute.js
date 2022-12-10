const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyUser = require("../middleware/verifyUser");

router
  .route("/register")
  .post(userController.signup)
  .get(userController.allUsers);
router.route("/login").post(userController.login);
router.route("/updateUser").put(verifyUser, userController.updateUserProfile);

module.exports = router;
