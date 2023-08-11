import './App.css'
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Register from './components/Register'
import { useState, useEffect } from 'react'
import Posts from "./components/Posts";

function App() {
  const [token, setToken] = useState(null)

  return (
    <>
      <Routes>
        <Route path='/' element={<Navbar/>}>
          <Route path='/login' element={<div>login</div>}/>
          <Route path='/posts' element={<div>posts</div>}/>
          <Route path="/posts/:id" element={<div>new post</div>}/>
        </Route>
      </Routes>
      <Register token={token} setToken={setToken}></Register>

    </>
  );
}

export default App;
