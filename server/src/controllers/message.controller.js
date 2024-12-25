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
    // Extract request data
    const { message, image } = req.body;
    const { id: receiverId } = req.params; // Get receiver ID from URL
    const senderId = req.user._id; // Ensure req.user is populated (middleware)

    // Initialize imageUrl and upload to Cloudinary if an image is provided
    let imageUrl = null;
    if (image) {
      const imageRes = await cloud.uploader.upload(image, { folder: "user-messages" });
      imageUrl = imageRes.secure_url; // Get secure URL
    }

    // Create and save the message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      image: imageUrl,
    });
    await newMessage.save();

    // Future implementation for Socket.IO
    // Example: io.emit('newMessage', newMessage);

    // Return the created message
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(`Error in SendUserMessage controller: ${error.message}`);
    res.status(500).json({ message: "Failed to send the message. Please try again." });
  }
};

