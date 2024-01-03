import React from 'react'
import { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import styled from "styled-components";
import loader from "../assets/loader.gif"
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {setAvatarApi } from '../utils/APIRoutes';
import { Buffer } from 'buffer';
import "../style/SetAvatar.css";
 
 export default function SetAvatar() {

    const api =  'https://api.multiavatar.com/45678995'

    const navigate = useNavigate();

    const[avatars, setAvatars] = useState([]);
    const[isLoading, setIsLoading] =useState(true);
    const[selectedAvatar, setSelectedAvatar] = useState(undefined);

    const toastOption = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        theme: "dark"
    }

    const setProfilePicture = async () => {
        try{
            if(selectedAvatar === undefined){
                toast.error("Please select an Avatar", toastOption);
            }else{
        
                const username = await JSON.parse(localStorage.getItem("chat-app-user"));
                console.log(username);
                const {data} = await axios.post(`${setAvatarApi}`,{
                    username,
                    image:avatars[selectedAvatar]
                })
                console.log(data);
                if(data.isSet){
                    navigate("/");
                }
                else{
                    toast.error("Error setting the Avatar", toastOption);
                }
            }
        }
        catch(err){
            console.log(err);
        }
        
    };

    useEffect(() =>{
        const data = [];
        async function fetchImage(){
            for(let i=0; i<4; i++){
                try{
                    const image = await axios.get(`${api}/${Math.round(Math.random() *1000)}`);
                const buffer = new Buffer(image.data);
                data.push(buffer.toString("base64"));
                }
                catch(err){
                    console.log(err);
                }
                
            }

            setAvatars(data);
            setIsLoading(false);
        }
        fetchImage();
        
    },[]);

    

   return (
    <>
        {
            isLoading ? <div className='container'>
                <img src={loader} alt="loader" className="loader"/>
            </div> :
            <div className='container'>
            <div className="titleContainer"> 
            <h1>Pick an Avatar as your Profile Picture</h1></div>
            <div className="avatars">
                {
                    avatars.map((avatar, index) => { 
                        return(
                           
                            <div  key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                                <img src= {`data:image/svg+xml;base64,${avatar}`} alt= "avatar"
                                onClick={() => setSelectedAvatar(index)}
                                />
                            </div>
                        )
                    })
                }
            </div>
    
            <button className='submitButton' onClick={setProfilePicture}>Set as Profile Picture</button>
        </div>
        }
    
    <ToastContainer/> 
    </>
   )
 }
 