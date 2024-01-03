import React  from 'react'
import "../style/chatContainer.css";
import ChatInput from './ChatInput';
import axios from "axios";
import { getMessageApi, sendMessageApi } from '../utils/APIRoutes';
import { useEffect , useState, useRef } from 'react';
import {v4 as uuidv4 } from "uuid"; 

export default function ChatContainer({currentChat, currentUser, socket}) {
  const [messages, setMessages] = useState([]);

  const[arrivalMessage, setArrivalMessage] = useState(null);

  const scrollRef = useRef();

  

  useEffect(()=>{
    const getChat = async()=>{
      try{
        if(currentChat){

          const response = await axios.post(getMessageApi, {
            from: currentUser.data._id,
            to: currentChat._id,
            
          })
          setMessages(response.data);
        }
      }
      catch(err){
        console.log(err);
      } 
      
    };
    getChat();  
    console.log(messages);
  },[currentChat,currentUser ] )

  
  const handleSendMsg = async(msg) =>{
    await axios.post(sendMessageApi,{
      from: currentUser.data._id,
      to: currentChat._id,
      message: msg,
    });

    socket.current.emit("sendMsg", {
      from: currentUser.data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({fromSelf:true, message:msg});
    setMessages(msgs);

  }


  useEffect(()=>{
    if(socket.current){
      socket.current.on("msgRecieve", (msg)=>{
        setArrivalMessage({fromSelf:false, message:msg});
      });
    }
  },[]);


  useEffect(()=>{
    try{

      arrivalMessage && setArrivalMessage((prev)=> [...prev, arrivalMessage]);
    }
    catch(err){
      console.log(err);
    }
    },[arrivalMessage]);

 


  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour: "smooth"}); 
  },[messages])


  return (
    <>

    { currentChat && (
      <div className='chatContainer'>
      <div className="chatHeader">
        <div className="avatar"> 
            <img src= {`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt= "avatar"/>
          </div>
        <div className="chatUserName">
          <h3>{currentChat.username}</h3>
        </div>
      </div>
      <div className="chatMessages">
        {
          messages.map((message)=>{
            return(
              <div  ref ={scrollRef} key={uuidv4()}>
                <div className={`message ${message.fromSelf ? "sent" : "recived"}`} >
                  <div className="content">
                    <p>
                      {message.message} 
                    </p>
                  </div>
                </div>
               </div>
            )
          })
        }
      </div>
      <ChatInput handleSendMsg={handleSendMsg}/>
    </div>
    )
    }
    </>
  )
}
