import './App.css'
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Register from './components/Register'
import { useState, useEffect } from 'react'
import Posts from "./components/Posts";
import Login from './components/Login'
import Logout from './components/Logout'
import PostForm from './components/PostForm'

function App() {
  const [token, setToken] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedOut, setLoggedOut] = useState(true);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Routes>
        <Route path='/' element={<Navbar/>}>
          <Route path='/login' element={<Login token={token} setToken={setToken} username={username} setUserName={setUserName} password={password} setPassword={setPassword}/>}/>
          <Route path='/posts' element={<Posts token={token} username={username} loggedIn={loggedIn} setLoggedIn={setLoggedIn} loggedOut={loggedOut} setLoggedOut={setLoggedOut}/> }/>
          <Route path="/posts/:id" element={<PostForm token={token}></PostForm>}/>
          <Route path="/register" element={<Register token={token} setToken={setToken} username={username} setUserName={setUserName} password={password} setPassword={setPassword}></Register>}/>
          <Route path="/logout" element={<Logout setLoggedIn={setLoggedIn} setUserName={setUserName} setPassword={setPassword} setLoggedOut={setLoggedOut} setToken={setToken}></Logout>}/>
        </Route>
      </Routes>
      {/* <Register token={token} setToken={setToken}></Register> */}
    </>
  );
}

export default App;
