const express = require("express");
const router = express.Router();
const userprogressController = require("../controller/progressController");
const verifyjwt = require("../middleware/verifyJWT");

// Update userprogress status by user ID and question ID
// router.use(verifyjwt)
router
  .post("/reset",userprogressController.resetProgress)
  .post("/update-progress", userprogressController.updateUserProgress)
  .post("/completed-questions", userprogressController.getUserProgress);

module.exports = router;
