import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function RequireAuth(props) {

async function check(){
    try{
        await axios.get("/checkAuth");
        localStorage.setItem("chat-app-user", "user");
    }
    catch(err){
        localStorage.removeItem("chat-app-user");
    }
    
}

if(localStorage.getItem("chat-app-user") === null){
    check(); 
}

if(localStorage.getItem("chat-app-user") === null){
    return <div>
        <span>Please Sign In! <Link to={"/login"}>Sign In</Link></span>
    </div>
}
  return (
    <div>{props.children}</div>
  )
}
