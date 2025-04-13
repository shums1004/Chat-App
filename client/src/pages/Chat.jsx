import React from 'react'
import "../style/chat.css"
import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { allUsersApi, getUserApi, host } from '../utils/APIRoutes';
import { useNavigate } from 'react-router-dom';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from  "socket.io-client";


export default function Chat() {

  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const socket = useRef();
  useEffect(() => {
    async function fetchUser(){
      const username = await JSON.parse(localStorage.getItem("chat-app-user"));
      const user = await axios.get(`${getUserApi}/${username}`);
      setCurrentUser(user);
    }
    fetchUser();    

  }, []);

  useEffect(()=>{
    if(currentUser){
      socket.current = io(host,{
        withCredentials:true,
        extraHeaders: {
          "Access-Control-Allow-Origin": true
        }
      });
      socket.current.emit("addUser", currentUser.data._id);
    }
  }, [currentUser])

  useEffect(() =>{
    if (currentUser) {
    
      console.log(currentUser);
      if (currentUser.data._id ) {
        console.log("User ID:", currentUser.data._id);
        async function fetchContacts() {
          try {
            const data = await axios.get(`${allUsersApi}/${currentUser.data._id}`);
            console.log("Contacts:", data.data);
            setContacts(data.data);
            setIsLoaded(true);
          } catch (error) {
            console.error("Error fetching contacts:", error);
          }
        }
        fetchContacts();
      } else {
        navigate("/setAvatar");
        console.error("currentUser._id is undefined");
      }
    }
  },[currentUser])


const handleChatChange = ((chat)=>{
  setCurrentChat(chat);
})

  
  return (
    <div className='mainContainer'>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser}   changeChat={handleChatChange}   />
        {
          isLoaded && currentChat === undefined ? 
          (<Welcome currentUser={currentUser}/>) :
          (<ChatContainer currentChat={currentChat} currentUser={currentUser} socket = {socket}/>)
        }
        
       </div>
       

    </div>
  )

}
