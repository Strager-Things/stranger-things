import { useState, useEffect } from "react"
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Register({ token, setToken, password, setPassword, username, setUserName}){
    const BASE_URL = 'https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-FT';
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate();

    const min = 8;//minimum number of characters for username and password
    const max = 16;//maximum number of characters for username and password
    
    //on submit this function will register the user through api call
    async function handleRegister(event){
        event.preventDefault();
        try{
            formValidate(username, password, password2);//call validate function to notify and make sure user does valid inputs
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
            //if the api call returns a false success(meaning user input is invalid) will prompt user to retry with valid inputs
            if(!result.success){
                console.log(result)
                setPassword2("");
                setSuccess("");
                setError(result.error.message)
            //if the api call returns a true success we want to store important values in state variables
            }else{
                //goal is to have the token stored in session storage so that as long as the user doesn't open a new tab or close tab, we will have access to their token from login or register
                sessionStorage.setItem("token",`${result.data.token}`);
                //still having issues with token  correctly being stored on certain page refreshes
                setToken(sessionStorage.getItem("token")); 
                //not really seen but if page doesn't refresh you will see success message
                setSuccess(result.data.message);
                setPassword2("");
                //to see api call information if page doesn't refresh
                // console.log(result);
                navigate("/posts");
            }   
        }catch(error){
            setError(error.message);
            console.log(error);
        }
    }

    function formValidate(username, password, password2){
        //validate for user inputing characters under 8
        if (username.length < min || password.length < min){
            setSuccess("");
            throw new Error("Username or password input needs to be greater than 8 and less than 16 characters. Please Try Again.");
        //validate for user inputing characters above 16
        } else if(username.length > max || password.length > max){
            setSuccess("");
            throw new Error("Username or password input needs to be greater than 8 and less than 16 characters. Please Try Again.")
        //validate for user inputing a space into input text
        } else if(username.includes(" ") || password.includes(" ")){
            setError("");
            setSuccess("");
            throw new Error("Username and password cannot accept spaces. Please Try Again.")
        //validate for user inputing different passwords when they should be the same
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
        </>
    )
}