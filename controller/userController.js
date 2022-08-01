import { UserModel } from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/******************************************************** */
// Create a new user
export const registerUser = async (req, res) => {
try {
    const userExits = await UserModel.findOne({ email: req.body.email });
    if (userExits) {
        return res.status(400).json({
            message: "User already exists",
            success: false
        });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new UserModel(req.body);
    const user = await newUser.save();
    res.status(201).json({
        message: "User created successfully",
        success: true,
        user
    });
} catch (error) {
    res.status(500).json({
        message: error.message,
        success: false
    });
}

};
/******************************************************** */


/******************************************************** */
//login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // Check if user exists
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "User does not exist",
      success: false,
    });
  }
  // Check if password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({
      message: "Incorrect password",
      success: false,
    });
  }
  // Create and assign a token
  const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.status(200).json({
    message: "Login successful",
    success: true,
    token
  });
};
/******************************************************** */


/******************************************************** */
//get user info by id
export const getUserInfoById = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.body.userId });
    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
        success: false,
      });
    } else {
      res.status(200).json({
        message: "User found",
        success: true,
        data: {
          userId: req.body.userId,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          isDoctor: user.isDoctor,
          isAdmin: user.isAdmin,
          isActive: user.isActive,
          seenNotification: user.seenNotification,
          unseenNotification: user.unseenNotification,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
    
  }
/******************************************************** */


/******************************************************** */
//get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}).select("-password");
    res.status(200).json({
      message: "Users found",
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
}

/******************************************************** */
//delete user notifications all
export const deleteUserNotification = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.body.userId });
    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
        success: false,
      });
    } else {
      user.unseenNotification = [];
      // user.seenNotification = [];
      await user.save();
      res.status(200).json({
        message: "User notification deleted",
        success: true,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
}

//delete user unseen notifications by id
export const deleteUserUnseenNotification = async (req, res) => {
  //get notification id from params
  const notificationId = req.params.id;
  try {
    const user = await UserModel.findOne({ _id: req.body.userId });
    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
        success: false,
      });
    } 
    //get notification id from user unseen notification
    const unseenNotification = user.unseenNotification;
    //find notification id in unseen notification
    const index = unseenNotification.filter( notification => notification._id == notificationId);
    //remove notification id from unseen notification
    unseenNotification.splice(index, 1);
    //save user unseen notification
    await user.save();
      res.status(200).json({
        message: "User notification deleted",
        success: true,
      });
  }
  catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
      error,
    });
  }
}