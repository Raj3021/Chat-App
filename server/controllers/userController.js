import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateAuthToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

// Signup a new user
export const signup = async (req, res) => {
  const { email, fullName, password, profilePicture, bio } = req.body;

  try {
    if (!email || !fullName || !password || !bio) {
      return res.json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.json({ success: false, message: "Account already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      bio,
    });

    const token = generateAuthToken(newUser._id);

    return res.json({
      success: true,
      message: "Account created successfully",
      userData: newUser,
      token,
    });
  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// login a user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // if (!email || !password) {
    //   return res.json({
    //     success: false,
    //     message: "Please fill all the fields",
    //   });
    // }

    const userData = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(password, userData.password);

    if (!isPasswordCorrect) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = generateAuthToken(userData._id);

    return res.json({
      success: true,
      message: "Login successful",
      userData,
      token,
    });
  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// Controller to check if the user is authenticated

export const checkAuth = async (req, res) => {
  res.json({ success: true, user: req.user });
};

// Controller to update user profile details
export const updateProfile = async (req, res) => {
  try {
    const { profilePicture, fullName, bio } = req.body;
    // console.log(profilePicture);

    const userId = req.user._id;
    let updatedUser = {};

    if (!profilePicture) {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { bio, fullName },
        { new: true }
      );
    } else {
      const upload = await cloudinary.uploader.upload(profilePicture);

      updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePicture: upload.secure_url, bio, fullName },
        { new: true }
      );
    } 
    return res.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message }); 
  }
};
