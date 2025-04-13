import React from 'react'
import { useState } from 'react';
import Picker from "emoji-picker-react";
import { IoMdSend} from "react-icons/io";
import { BsEmojiSmileFill} from "react-icons/bs";
import "../style/chatInput.css";

export default function ChatInput({handleSendMsg} ) {

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");


    const handleEmojiPicker = () =>{
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick = ({ emoji }) => {
        setMsg(prev => prev + emoji);
      };
    const sendChat = (event) =>{
        event.preventDefault();

        if(msg.length >0 ){
            handleSendMsg(msg);
            setMsg("");
        }
    }



  return (
   <div className="mainInputContainer">
    <div className="buttonContainer">
        <div className="emoji">
            <BsEmojiSmileFill onClick={handleEmojiPicker}/>
            {
                showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />
            }
        </div>
    </div>
    <form className='inputContaier' onSubmit={(e)=> sendChat(e)}>
        <input type = "text" placeholder='Type your message here...'  value = {msg} onChange={(e)=>setMsg(e.target.value)}/>
        <button className='submit'>
            <IoMdSend/>
        </button>

    </form>
   </div>
  )
}
