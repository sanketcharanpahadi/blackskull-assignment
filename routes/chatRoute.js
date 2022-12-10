const express = require("express");
const chatController = require("../controllers/chatControllers");
const router = express.Router();
const verifyUser = require("../middleware/verifyUser");

router.route("/").post(verifyUser, chatController.accessChat);
router.route("/").get(verifyUser, chatController.fetchChats);

module.exports = router;
