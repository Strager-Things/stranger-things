import { useState, useEffect } from "react"
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login({ token, setToken, password, setPassword, username, setUserName}){
    const BASE_URL = 'https://strangers-things.herokuapp.com/api/2209-acc-pt-web-pt-d';
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const min = 8;
    const max = 16;

    async function handleLogin(event){
        event.preventDefault();
        try {
            formValidate(username, password);
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
            if(!result.success){
                console.log(result)
                setError(result.error.message)
            }else{
                setToken(result.data.token)
                sessionStorage.setItem("token", `${result.data.token}`);
                navigate("/posts");
            }
            // return result
          } catch (err) {
            setError(err.message);
            console.error(err);
          }
    }

    function formValidate(username, password){
        if (username.length < min || password.length < min){
            throw new Error("Username or password input needs to be greater than 8 and less than 16 characters. Please Try Again.");
            // setError(error);
        } else if(username.length > max || password.length > max){
            throw new Error("Username or password input needs to be greater than 8 and less than 16 characters. Please Try Again.")
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