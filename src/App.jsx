 //import the css
import './App.css'
//import from react router
import {Routes, Route} from 'react-router-dom'
//import from react
import { useState} from 'react'
//import components
import Navbar from './components/Navbar'
import Register from './components/Register'

import Posts from './components/Posts'
import Post from './components/Post'
import Login from './components/Login'
import Logout from './components/Logout'
import PostForm from './components/PostForm'

function App() {
  const [token, setToken] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedOut, setLoggedOut] = useState(true);
  const [username, setUserName] = useState("");
  const [posts, setPosts] = useState([]);//add posts
  const [password, setPassword] = useState("");


  return (
    <>
      <Routes>
        <Route path='/' element={<Navbar/>}>
          <Route path="/posts/:id/message" element={<Post 
                                              posts={posts}
                                              token={token}/>}/>
          <Route path='/login' element={<Login token={token} setToken={setToken} username={username} setUserName={setUserName} password={password} setPassword={setPassword}/>}/>
          <Route path='/posts' element={<Posts token={token} posts={posts} setPosts={setPosts} username={username} loggedIn={loggedIn} setLoggedIn={setLoggedIn} loggedOut={loggedOut} setLoggedOut={setLoggedOut}/> }/>
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
