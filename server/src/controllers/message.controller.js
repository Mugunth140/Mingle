import cloud from "../lib/cloud.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const UserSidebar = async (req, res) => {
  try {

    const loggedUserId = req.user._id;

    // fetching all users without the password feild with find() except the current user 
    const filteredUser = await User.find({ _id: { $ne: loggedUserId } }).select(
      "-password"
    );

    res.status(200).json(filteredUser);

  } catch (error) {
    console.log(`Error on UserSidebar controller ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const FetchUserMessage = async (req, res) => {
  try {

    //receiverId is :id in params
    const { id: receiverId } = req.params;

    //senderId is myUserId
    const senderId = await req.user._id;

    //fetching all messages with find() using an $or with two conditions [{senderIdField:myUserId,receiverIdField: dynamic id params},{senderIdField: dynamic id params,receiverIdField: myUserId}]
    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });

    //send all messages via json
    res.status(200).json(messages);

  } catch (error) {
    console.log(`Error on FetchUserMessage controller ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const SendUserMessage = async (req, res) => {
  try {
    // fetching request data from req
    const { message, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // creating an temp variable and assigning the base64 image url from cloudinary later
    let imageUrl;
    if (imageUrl) {
      const imageRes = await cloud.uploader.upload(image);
      imageUrl = imageRes.secure_url;
    }

    // creating a single message user new keyword and save the process
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      image: imageUrl,
    });
    await newMessage.save();

    //future implementation for realtime functionality with socket.io

    //returning the single message via json
    res.status(201).json(newMessage);
  } catch (error) {
    console.log(`Error on SendUserMessage controller ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
