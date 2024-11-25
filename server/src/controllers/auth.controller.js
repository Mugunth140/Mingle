import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { tokenGenerator } from "../utils/utils.js";
import cloud from "../lib/cloud.js"

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

    if (user) res.status(400).json({ message: "Email Already Exists" });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
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
    const Valid = await bcrypt.compare(password, user.password);

    if (!Valid) {
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
    res.cookie("jwt-token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(`Error on logout controller ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
    try {
        const {profilepic} = req.body
        const userId = req.user._id

        if (!profilepic) {
            return res.status(400).json({message:"Required profilepic"})
        }

        const uploadres = await cloud.uploader.upload(profilepic)
        const updatedUser = await User.findByIdAndUpdate(userId,{
            profilepic: uploadres.secure_url
        },{new:true} )

        res.status(201).json(updatedUser)
        
    } catch (error) {
        console.log(`Error on updateProfile controller ${error.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
} 