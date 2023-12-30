const express = require("express");
const authcontroller = require("../controller/authController");
const router = express.Router();

router
  .post("/login", authcontroller.login)
  .post("/register", authcontroller.register)
  .post("/logout", authcontroller.logout)
  .get("/refresh", authcontroller.refresh);

module.exports = router;