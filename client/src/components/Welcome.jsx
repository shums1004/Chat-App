import React from 'react';
import { useState,useEffect } from 'react';
import Robot from "../assets/robot.gif";
import "../style/welcome.css"

export default function Welcome({currentUser}) {

  return (
    <div className='welcomeContainer'> 
        <img src={Robot} alt='robot'/>
        <h1> Welcome, <span>{currentUser.data.username}</span> </h1>
        <h3>Please Select a contact to start a chat</h3>
    </div>
  )
}
