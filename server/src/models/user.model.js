import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    profilepic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userSchema);

export default User;
