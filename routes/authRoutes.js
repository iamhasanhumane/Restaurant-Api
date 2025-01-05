const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/authControllers");

// creating the router object
const router = express.Router();

// Routes

// REGISTER | POST
router.post("/register", registerController);

// LOGIN | POST
router.post("/login", loginController);

//export
module.exports = router;
