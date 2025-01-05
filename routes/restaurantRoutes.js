const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantController,
} = require("../controllers/restaurantController");

// creating the router object
const router = express.Router();

//Routes
// CREATE RESTAURANT | POST
router.post("/create", authMiddleware, createRestaurantController);

// GET ALL RESTAURANTS | GET
router.get("/getAll", getAllRestaurantController);

// GET RESTAURANT BY ID | GET
router.get("/get/:id", getRestaurantByIdController);

// DELETE RESTAURANT || DELETE
router.delete("/delete", authMiddleware, deleteRestaurantController);

module.exports = router;
