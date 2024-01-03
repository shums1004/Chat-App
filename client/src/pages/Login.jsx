import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import logo from "../assets/logo.svg"
import "../style/auth.css"
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginApi } from '../utils/APIRoutes';



export default function Login() {

  
  const navigate = useNavigate();

    const [values, setValues] = useState({
        email:"",
        password:"",
    });


    const handleValidtion = () =>{
        const {password, username} = values;

        console.log("inside handle validation");

        console.log(username , password);
        
        if(username.length === 0 || username[0].length < 3){
            toast.error("Please enter a valid username and password", toastOption);
            return false;
        }
        if(password.length === 0 || password[0].length <8){
            toast.error("Please enter a valid username and password", toastOption);
            return false;
        }
        
        return true;
    }

    const toastOption = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        theme: "dark"
    }

    useEffect(()=>{
        if(localStorage.getItem('chat-app-user'))
            navigate('/');
    },[])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(handleValidtion()){
            try{
                console.log("inside Handle submit")
                const {password,username} = values;
                console.log(username);
                console.log(password);
                const {data} = await axios.post(loginApi,{
                    username,
                    password,
                });

                const us = username[0];
                
                if(data.status === false){
                    toast.error(data.msg, toastOption);
                }
                if(data.status === true){
                    localStorage.setItem("chat-app-user", JSON.stringify(us));
                    navigate("/");
                }
            }
            catch(err){
                console.log(err);
            }

        
        }
    };

    const handleChange = (e)=>{
        setValues({...values, [e.target.name] : [e.target.value]} )
    };

  return (
    <div>
        <div className='formContainer'>
            <form onSubmit={(event)=> handleSubmit(event)} className='form'>
                <div className='brand'>
                    <img src={logo} alt='logo'/>
                    <h2>WUD</h2>
                </div>
                <input type="text" placeholder='Username' name="username" onChange={(e)=> handleChange(e)} />
                <input type="password" placeholder='Password' name="password" onChange={(e)=> handleChange(e)} />
                <button type = "submit"> Log In</button>
                <span> Don't have an Account? <Link to="/register">Sign Up</Link></span>
            </form>
        </div>
        <ToastContainer/>
    </div>
  )
}


