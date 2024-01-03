import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import logo from "../assets/logo.svg"
import "../style/auth.css"
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerApi } from '../utils/APIRoutes';

function Register() {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        userName:"",
        email:"",
        password:"",
        confirmPassword:""
    });


    const handleValidtion = () =>{
        const {password, confirmPassword, username, email} = values;

        // console.log(password);

        // console.log(password, password[0].length, username, username[0].length);
        if(username === undefined || username[0].length < 3){
            toast.error("Username should be more than 3 characters", toastOption);
            return false;
        }
        if(email ===  undefined||email === ""){
            toast.error("Email is required", toastOption);
            return false;
        }
        else if(password.length === 0 || password[0].length <8){
            toast.error("Password should be atleast 8 characters long", toastOption);
            return false;
        }
        else if(confirmPassword.length === 0 ||password[0] !== confirmPassword[0]){
            toast.error("Password and Confirm-Password should be same", toastOption);
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


    useEffect(() => {
        if(localStorage.getItem("chat-app-user")){
            navigate("/");
        }
    }, []);
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(handleValidtion()){
            try{
                console.log("inside Handle submit")
                const {password,username, email} = values;
                console.log(username);
                const {data} = await axios.post(registerApi,{
                    username,
                    email,
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
                <input type="email" placeholder='Email' name="email" onChange={(e)=> handleChange(e)} />
                <input type="password" placeholder='Password' name="password" onChange={(e)=> handleChange(e)} />
                <input type="password" placeholder='Confrim Password' name="confirmPassword" onChange={(e)=> handleChange(e)} />
                <button type = "submit">Create User</button>
                <span>Already have an account? <Link to="/login">Login</Link></span>
            </form>
        </div>
        <ToastContainer/>
    </div>
  )
}



export default Register;
