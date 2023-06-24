const express = require("express");
const router = express.Router();
const userController = require("../controller/userController")
const requireAuth = require("../middleware/requireAuth")


router.route("/signup").post(userController.signup)
router.route("/login").post(userController.login)
router.route("/logout").get(userController.logout)
router.route("/check-auth").get(requireAuth, userController.checkAuth)

module.exports = router;