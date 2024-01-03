import React from 'react'
import { useState, useEffect } from 'react';
import Logo from "../assets/logo.svg"
import "../style/contacts.css";
import { useNavigate } from 'react-router-dom';

export default function Contacts({contacts, currentUser, changeChat}) {

  const navigate = useNavigate();
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const changeAvatar = ()=>{
    navigate("/setAvatar");
  }
  useEffect(() => {
    if(currentUser){
      setCurrentUserImage(currentUser.data.avatarImage);
      setCurrentUserName(currentUser.data.username);
    }
  },[currentUser]);

  const changeCurrentChat = (index, contact) =>{
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {
        currentUserImage && currentUserName && (
          <div className='contactsContainer'>
            <div className="brand">
              <img  src={Logo} alt ="logo"/>
              <h3>WUD</h3>
            </div>
            <div className="currentUser">
            <div className="avatar"> 
                      <img onClick={changeAvatar} src= {`data:image/svg+xml;base64,${currentUserImage}`} alt= "avatar"/>
                      </div>
                      <div className="username">
                        <h3>{currentUserName}</h3>
                      </div>

            </div>
            <div className="contacts">
              {
              contacts.map((contact, index) => {  
                return(
                  <div className= {`contact ${index === currentSelected ? "selected" : "" }`}  key ={index} onClick={() =>changeCurrentChat(index,contact)}>
                      <div className="avatar"> 
                      <img src= {`data:image/svg+xml;base64,${contact.avatarImage}`} alt= "avatar"/>
                      </div>
                      <div className="username">
                        <h3>{contact.username}</h3>
                      </div>
                  </div>
                  
                )
              })
            } 
            </div>
            
          </div>
        )
      }
  
    
    </>
    
  )
}
