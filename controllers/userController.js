const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

const getUserController = async (req, res) => {
  try {
    const user = await userModel.findById(
      { _id: req.body.user_id },
      { _id: 0, password: 0 }
    );

    if (!user) {
      res.status(404).send({
        message: "User Not Found",
        success: false,
      });
    } else {
      res.status(200).send({
        message: "User Retrieved",
        success: true,
        user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in Get User Api",
      success: false,
      error,
    });
  }
};

//  UPDATE

const updateUser = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.user_id });

    const { userName, address, phone } = req.body;

    if (!user) {
      res.status(404).send({
        status: false,
        message: "User Not Found",
      });
    }

    //update

    if (userName) {
      user.userName = userName;
      console.log("username changed");
    }
    if (address) {
      user.address = address;
      console.log("address changed");
    }
    if (phone) {
      user.phone = phone;
      console.log("Phone number changed");
    }

    // save user
    await user.save();
    res.status(200).send({
      success: true,
      message: "User Updated Successfully",
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error in Update User Api",
      error,
    });
  }
};

// Update Password
const updatepassword = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.body.user_id });
    console.log(user.userName);

    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    // get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please provide old and new password",
      });
    }

    //checking if oldPassword is matched
    const isMatch = bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid oldpassword",
      });
    }

    // hasing the received newPassword
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Password Update Api",
      error,
    });
  }
};

// Reset Password
const resetpassword = async (req, res) => {
  try {
    const { email, newpassword, answer } = req.body;
    if (!email || !newpassword || !answer) {
      return res.status(404).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found or Invalid Answer",
      });
    }

    // hashing the new password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newpassword, salt);
    user.password = hashedPassword;
    await user.save();

    // returning response
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Reset Password Api",
      error,
    });
  }
};

//Delete User Profile
const deleteProfileContainer = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Your account has been deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Delete User Api",
      error,
    });
  }
};

module.exports = {
  getUserController,
  updateUser,
  updatepassword,
  resetpassword,
  deleteProfileContainer,
};
