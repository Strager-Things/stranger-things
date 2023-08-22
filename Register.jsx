import { useState, useEffect } from "react"
import React from "react";

export default function Register({ token, setToken}){
    const BASE_URL = 'https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-FT';
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const min = 8;

    async function handleRegister(event){
        event.preventDefault();
        try{
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
            setToken(result.data.token);
            setSuccess(result.data.message);
            console.log(result);
            // console.log(success);
            
        }catch(error){
            setError(error.message);
            console.log(error);
        }
    }

    return (
        <>
            <h2>Register Now!</h2>
            <form onSubmit={handleRegister}>
                <label>
                    Username: <input value={username} onChange={e =>{
                        setUserName(e.target.value);
                    }}/>
                </label>
                <label>
                    Password: <input value={password} onChange={e =>{
                        setPassword(e.target.value);
                    }}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
            {success && <p>{success}</p>}
            {error && <p>{error}</p>}
        </>
    )
}