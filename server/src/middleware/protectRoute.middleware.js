import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorize - No token provided" });
    }

    const tokenDecode = jwt.verify(token, process.env.JWT_KEY);

    if (!tokenDecode) {
      return res.status(401).json({ message: "Unauthorize - Invalid Token" });
    }

    const user = await User.findById(tokenDecode.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(`Error on protectRoute middleware ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
