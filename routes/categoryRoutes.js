const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createCatController,
  getAllCatController,
  updateCatController,
  deleteCatController,
} = require("../controllers/categoryController");

// creating the router object
const router = express.Router();

//routes
// creating a category
router.post("/create", authMiddleware, createCatController);

// get all categories
router.get("/get-all", getAllCatController);

// updating a category
router.put("/update/:id", authMiddleware, updateCatController);

// deleting a category
router.delete("/delete/:id", authMiddleware, deleteCatController);

module.exports = router;
