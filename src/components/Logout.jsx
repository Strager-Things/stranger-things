import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logout({ setLoggedIn, setUserName, setPassword, setLoggedOut, setToken }){
    const navigate = useNavigate();
    sessionStorage.removeItem("token");
    setLoggedIn(false);
    setUserName("");
    setPassword("");
    setLoggedOut(true);
    setToken(null)
    navigate('/login');


    return(
        <>
            
        </>
    )
}