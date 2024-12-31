import User from "../models/user.model.js";
import CryptoJS from "crypto-js";
import { tokenGenerator } from "../utils/utils.js";
import cloud from "../lib/cloud.js";

const SECRET_KEY = process.env.JWT_KEY;

const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
};

const decryptPassword = (encryptedPassword) => {
  return CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY).toString(CryptoJS.enc.Utf8);
};

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Require all fields" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 8 charaters" });
    }
    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "Email Already Exists" });

    const encryptedPassword = encryptPassword(password);

    const newUser = new User({
      username,
      email,
      password: encryptedPassword,
    });

    if (newUser) {
      tokenGenerator(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        profilepic: newUser.profilepic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log(`Error on signup controller ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Crendential" });
    }
    const decryptedPassword = decryptPassword(user.password);
    if (password !== decryptedPassword) {
      return res.status(400).json({ message: "Invalid Crendential" });
    }

    tokenGenerator(user._id, res);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profilepic: user.profilepic,
    });
  } catch (error) {
    console.log(`Error on login controller ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(`Error on logout controller ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilepic } = req.body;
    const userId = req.user._id;

    if (!profilepic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    const uploadRes = await cloud.uploader.upload(profilepic);

    const updatedUser = await User.findByIdAndUpdate(userId, {
      profilepic: uploadRes.secure_url,
    }, { new: true });

    res.status(201).json(updatedUser);
  } catch (error) {
    console.error(`Error updating profile: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const authCheck = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log(`Error on Check Auth controller ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};