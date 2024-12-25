import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useChatStore } from "../store/useChatStore";
import "../sass/components/chatHeader.scss";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser} = useChatStore();

  return (
    <header
      className="chatHeader-container"
      style={{ "--icon-color": "var(--neutral)" }}
    >
      <IoIosArrowBack style={{ color: "var(--icon-color)" }} size={20} onClick={() => setSelectedUser(null)} />
      <img src={selectedUser.profilepic || "/avatar.png"} alt="prifilepic" />
      <h2>{selectedUser.username}</h2>
    </header>
  );
};

export default ChatHeader;
