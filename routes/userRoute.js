const express = require("express");
const {
  getUserController,
  updateUser,
  updatepassword,
  resetpassword,
  deleteProfileContainer,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

// creating the router object
const router = express.Router();

//Routes
// GET USER | GET
router.get("/getuser", authMiddleware, getUserController);

//Update profile
router.put("/updateuser", authMiddleware, updateUser);

//Update Password
router.post("/updatepassword", authMiddleware, updatepassword);

//Update Password
router.post("/resetpassword", authMiddleware, resetpassword);

//Delete User
router.delete("/deleteUser/:id", authMiddleware, deleteProfileContainer);

module.exports = router;
