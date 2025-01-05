const categoryModel = require("../models/categoryModel");

// CREATE CAT
const createCatController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    //validation
    if (!title) {
      return res.status(404).send({
        success: false,
        message: "please provide category title or image",
      });
    }

    const newCategory = new categoryModel({ title: title, imageUrl: imageUrl });
    await newCategory.save();

    res.status(201).send({
      success: true,
      message: "category created",
      newCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in create cat Api",
      error,
    });
  }
};

// Get All Categories
const getAllCatController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});

    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "No Categories Found",
      });
    }

    res.status(200).send({
      success: true,
      totalCat: categories.length,
      categories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in getting all the categories Api",
    });
  }
};

// Updating a category
const updateCatController = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, imageUrl } = req.body;

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );

    if (!updatedCategory) {
      res.status(404).send({
        success: false,
        message: "No Category Found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Updating a category api",
      error,
    });
  }
};

const deleteCatController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Please provide Categroy ID",
      });
    }

    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "No Category Found with this ID",
      });
    }

    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "category Deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Delete Cat Api",
      error,
    });
  }
};

module.exports = {
  createCatController,
  getAllCatController,
  updateCatController,
  deleteCatController,
};
