const express = require("express");
const router = express.Router();
const controller = require("../controller/controller");
const requireAuth = require("../middleware/requireAuth")

router.route("/").get(requireAuth, controller.getNotes);

router.route("/notes").post(requireAuth, controller.postNotes);

router.route("/notes/:id").get(requireAuth, controller.getNote).patch(controller.updateNote).delete(controller.deleteNote); 

module.exports = router;