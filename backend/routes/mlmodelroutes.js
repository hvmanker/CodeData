const express = require("express");
const mlcontroller = require("../controller/mlmodelcontroller");
const router = express.Router();

router
  .get("/gettotalquestions", mlcontroller.getTotalQuestionsPerTag)
  // .get("/completedques/:userId", mlcontroller.getTotalCompletedQuestionsPerTag)
  .get("/combined-data/:userId", mlcontroller.getCombinedData)
  // .post("/predict",mlcontroller.predict)

module.exports = router;
