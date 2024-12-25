import {useRef, useState} from 'react';
import '../sass/components/chatInput.scss';
import { useChatStore } from '../store/useChatStore';

const ChatInput = () => {
  
    const [text, setText] = useState("");
    const [imagePreview, setimagePreview] = useState(false);
    const fileInputRef = useRef(null);
    const {sendMessage} = useChatStore;


  return (
    <div>ChatInput</div>
  )
}

export default ChatInput