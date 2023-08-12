import { useState, useEffect } from "react"
import React from "react";

export default function Register({ token, setToken}){
    const BASE_URL = 'https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-FT';
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    
    const min = 8;
    const max = 16;
    

    async function handleRegister(event){
        event.preventDefault();
        try{
            formValidate(username, password);
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
                setUserName("");
                setPassword("");
                setSuccess("");
                setError(result.error.message)
            }else{
                setToken(result.data.token);
                setSuccess(result.data.message);
                setUserName("");
                setPassword("");
                // sessionStorage.setItem(token);
                console.log(result);
            // console.log(success);
            }   
        }catch(error){
            setError(error.message);
            console.log(error);
        }
    }

    function formValidate(username, password){
        if (username.length < min || password.length < min){
            setSuccess("");
            throw new Error("Username or password input needs to be greater than 8 and less than 16 characters. Please Try Again.");
            // setError(error);
        } else if(username.length > max || password.length > max){
            setSuccess("");
            throw new Error("Username or password input needs to be greater than 8 and less than 16 characters. Please Try Again.")
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
                <input type="submit" value="Submit"/>
            </form>
            {success ? success && <p>{success}</p> : error && <p>{error}</p>}
            
        </>
    )
}