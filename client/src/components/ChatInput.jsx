import {useRef, useState} from 'react';
import { useChatStore } from '../store/useChatStore';
import { MdSend  } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { IoMdRemove } from "react-icons/io";
import toast from 'react-hot-toast';
import '../sass/components/chatInput.scss';

const ChatInput = () => {
  
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(false);
    const fileInputRef = useRef(null);
    const {sendMessages} = useChatStore();

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
  
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    };
  
    const removeImage = () => {
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
  
    const handleSendMessage = async (e) => {
      e.preventDefault();
      if (!text.trim() && !imagePreview) return;
  
      try {
        await sendMessages({
          message: text.trim(),
          image: imagePreview,
        });
  
        // Clear form
        setText("");
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    };


  return (
    <>
     <div className="message-form">
      {imagePreview && (
        <div className="image-preview">
          <div className="image-wrapper">
            <img src={imagePreview} alt="Preview" className="preview-image" />
            <button
              onClick={removeImage}
              className="remove-button"
              type="button"
              style={{ "--icon-color": "var(--primary)" }}
            >
              < IoMdRemove  className="remove-icon" style={{ color: "var(--icon-color)"}} />
            </button>
          </div>
        </div>
      )}

<form onSubmit={handleSendMessage} className="message-form-container" style={{ "--icon-color": "var(--primary)" }}>
        <div className="input-container">
          <input
            type="text"
            className="message-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="file-input"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`file-button ${imagePreview ? "active" : ""}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <CiImageOn size={28} style={{ color: "var(--icon-color)"}} />
          </button>
        </div>
        <button
          type="submit"
          className="send-button active"
          disabled={!text.trim() && !imagePreview}
        >
        <MdSend size={20} style={{ color: "var(--icon-color)"}} />
        </button>
      </form>
    </div>
    </>
  )
}

export default ChatInput