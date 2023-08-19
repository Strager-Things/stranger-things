import { useState, useEffect } from "react"
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Register({ token, setToken, password, setPassword, username, setUserName}){
    const BASE_URL = 'https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-FT';
    // const [username, setUserName] = useState("");
    // const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate();

    const min = 8;
    const max = 16;
    

    async function handleRegister(event){
        event.preventDefault();
        try{
            formValidate(username, password, password2);
            const request = await fetch(`${BASE_URL}/users/register`, {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  user: {
                    username: username,
                    password: password,
                  }
                })
            })
            const result = await request.json();
            // console.log(result);
            if(!result.success){
                console.log(result)
                // setUserName("");
                // setPassword("");
                setPassword2("");
                setSuccess("");
                setError(result.error.message)
            }else{
                setToken(result.data.token);
                setSuccess(result.data.message);
                // setUserName("");
                // setPassword("");
                setPassword2("");
                // console.log("Register token:", result.data.token)
                sessionStorage.setItem("token",`${result.data.token}`);
                // console.log(sessionStorage.getItem("token"));
                console.log(result);
            // console.log(success);
                navigate("/posts");
            }   
        }catch(error){
            setError(error.message);
            console.log(error);
        }
    }

    function formValidate(username, password, password2){
        if (username.length < min || password.length < min){
            setSuccess("");
            throw new Error("Username or password input needs to be greater than 8 and less than 16 characters. Please Try Again.");
            // setError(error);
        } else if(username.length > max || password.length > max){
            setSuccess("");
            throw new Error("Username or password input needs to be greater than 8 and less than 16 characters. Please Try Again.")
        } else if(username.includes(" ") || password.includes(" ")){
            setError("");
            setSuccess("");
            throw new Error("Username and password cannot accept spaces. Please Try Again.")
        } else if(password !== password2){
            setError("");
            setSuccess("");
            throw new Error("Passwords do not match")
        }
    }

    return (
        <>
            <h2>Register Now!</h2>
            <form onSubmit={handleRegister}>
                <label>
                    Username: <input required value={username} onChange={e =>{
                        setUserName(e.target.value);
                    }}/>
                </label>
                <label>
                    Password: <input required value={password} onChange={e =>{
                        setPassword(e.target.value);
                    }}/>
                </label>
                <label>
                    Confirm Password: <input required value={password2} onChange={e =>{
                        setPassword2(e.target.value);
                    }}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
            {success ? success && <p>{success}</p> : error && <p>{error}</p>}
            {/* {sessionStorage.setItem("token",`${token}`)} */}
        </>
    )
}