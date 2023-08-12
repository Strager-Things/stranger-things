import './App.css'
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Register from './components/Register'
import { useState, useEffect } from 'react'
import Posts from "./components/Posts";
import Login from './components/Login'

function App() {
  const [token, setToken] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false);
  // const [username, setUserName] = useState("");
  // const [password, setPassword] = useState("");

  return (
    <>
      <Routes>
        <Route path='/' element={<Navbar/>}>
          <Route path='/login' element={<Login token={token} setToken={setToken}/>}/>
          <Route path='/posts' element={<Posts token={token}/>}/>
          <Route path="/posts/:id" element={<div>new post</div>}/>
          <Route path="/register" element={<Register token={token} setToken={setToken}></Register>}/>
        </Route>
      </Routes>
      {/* <Register token={token} setToken={setToken}></Register> */}
      

    </>
  );
}

export default App;
