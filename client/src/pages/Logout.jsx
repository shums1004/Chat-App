import React, { useEffect } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { loginApi, logoutApi } from '../utils/APIRoutes';
import { Link } from 'react-router-dom';



export default function Logout() {

    const navigate = useNavigate();
    async function logout(){
        localStorage.clear();
        axios.post(logoutApi);
    };
    
    try{
       logout();
    }
    catch(err){
        console.log(err);
    }
    
  return (
    <div>
        <h1>You have been logged out!</h1>
        <span>Wanna visit again? <Link to="/login">Login</Link></span>
    </div>

  )
}
