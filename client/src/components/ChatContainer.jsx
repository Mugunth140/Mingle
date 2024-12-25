import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { FiLoader } from "react-icons/fi";
import { formatTime } from "../lib/utils";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import "../sass/components/chatContainer.scss";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    // subscribeToMessages();
    // return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    // subscribeToMessages,
    // unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <ChatHeader />

      <div className="chat-messages">
        {isMessagesLoading ? (
          <div className="message-loader">
            <FiLoader
              size={20}
              style={{ color: "var(--icon-color)" }}
              className="spinner"
            />
          </div>
        ) : (
          messages.map((message) => (
            <>
              <div
                key={message._id}
                className={`message ${
                  message.senderId === authUser._id ? "sender" : "receiver"
                }`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="message-image"
                  />
                )}
                {message.message && <p>{message.message}</p>}
              </div>
              <time  className={`message-time ${
                  message.senderId === authUser._id ? "sender-time" : "receiver-time" 
                }`}>
                {formatTime(message.createdAt)}
              </time>
            </>
          ))
        )}
      </div>

      <ChatInput />
    </div>
  );
};

export default ChatContainer;
