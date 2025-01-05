const restaurantModel = require("../models/restaurantModel");

const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    // validation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "please provide title and address",
      });
    }

    const newRestaurant = new restaurantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newRestaurant.save();
    res.status(201).send({
      success: true,
      message: "New Restaurant Created Successfully",
    });
  } catch (error) {
    console.log("Internal Server Error", error);
    return res.status(500).send({
      success: false,
      message: "Server Error in  Create Restaurant Api",
    });
  }
};

const getAllRestaurantController = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find({});
    if (!restaurants) {
      return res.status(404).send({
        success: false,
        message: "No Restaurant Model Available",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.error("Internal Server Error", error);
    return res.status(500).send({
      success: false,
      message: "Error in Getting All the Restaurant Apis",
      error,
    });
  }
};

const getRestaurantByIdController = async (req, res) => {
  try {
    const restaurant_id = req.params.id;

    if (!restaurant_id) {
      return res.status(404).send({
        success: false,
        message: "Please provide the restaurant id",
      });
    }

    // finding the restaurant
    const restaurant = await restaurantModel.findById(restaurant_id);

    // validating for the presence of restaurant
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "No Restaurant Found",
      });
    }
    res.status(200).send({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.error("Internal Server Error");
    return res.status(500).send({
      success: false,
      message: "Error in getting the restaurant by id",
      error,
    });
  }
};

const deleteRestaurantController = async (req, res) => {
  try {
    const restaurant_id = req.params.id;

    if (!restaurant_id) {
      return res.status(404).send({
        success: false,
        message: "Please Provide Restaurant Id",
      });
    }

    const restaurant = await restaurantModel.findById(restaurant_id);

    if (restaurant) {
      return res.status(404).send({
        success: false,
        message: "No Restaurant Found with the Provided ID",
      });
    }

    await restaurantModel.findByIdAndDelete(restaurant_id);
    res.status(200).send({
      success: true,
      message: "Restaurant Deleted Successfully",
    });
  } catch (error) {
    console.error("Internal Server Error", error);
    return res.status(500).send({
      success: false,
      message: "Error in Deleting the restaurant",
      error,
    });
  }
};

module.exports = {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantController,
};
