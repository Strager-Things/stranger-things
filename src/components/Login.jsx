import { useState, useEffect } from "react"
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login({ token, setToken, password, setPassword, username, setUserName}){
    const BASE_URL = 'https://strangers-things.herokuapp.com/api/2209-acc-pt-web-pt-d';
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const min = 8;//minimum number of characters for username and password
    const max = 16;//maximum number of characters for username and password

    //on submit this function will login the user through api call
    async function handleLogin(event){
        event.preventDefault();
        try {
            formValidate(username, password);//call validate function to notify and make sure user does valid inputs
            const response = await fetch(`${BASE_URL}/users/login`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                user: {
                  username: username,
                  password: password
                }
              })
            });
            const result = await response.json();
            console.log(result);
            //if the api call returns a false success(meaning user input is invalid) will prompt user to retry with valid inputs
            if(!result.success){
                console.log(result)
                setError(result.error.message)
            //if the api call returns a true success we want to store important values in state variables
            }else{
                //goal is to have the token stored in session storage so that as long as the user doesn't open a new tab or close tab, we will have access to their token from login or register
                sessionStorage.setItem("token", `${result.data.token}`);
                setToken(sessionStorage.getItem("token"));
                navigate("/posts");
            }
            // return result
          } catch (err) {
            setError(err.message);
            console.error(err);
          }
    }

    function formValidate(username, password){
        //validate for user inputing characters under 8
        if (username.length < min || password.length < min){
            throw new Error("Username or password input needs to be greater than 8 and less than 16 characters. Please Try Again.");
        //validate for user inputing characters above 16
        } else if(username.length > max || password.length > max){
            throw new Error("Username or password input needs to be greater than 8 and less than 16 characters. Please Try Again.")
        //validate for user inputing a space into input text
        } else if(username.includes(" ") || password.includes(" ")){
            setError("");
            throw new Error("Username and password cannot accept spaces. Please Try Again.")
        }
    }

    return(
        <>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
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
            {/* {sessionStorage.setItem("token",`${token}`)} */}
            <Link to={"/register"}>Register</Link>
            {error && <p>{error}</p>}
        </>
    )
}