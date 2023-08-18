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


function App() {
  const [token, setToken] = useState(null)
  const [posts, setPosts] = useState([]);//add posts

  return (
    <>
      <Routes>
        <Route path='/' element={<Navbar/>}>
          <Route path='/login' element={<Register 
                                          token={token} 
                                          setToken={setToken}
                                          />}/>
          <Route path='/posts' element={<Posts 
                                          token={token}  
                                          posts={posts} 
                                          setPosts={setPosts}/>}/>
          <Route path="/posts/:id/message" element={<Post 
                                              posts={posts}
                                              token={token}/>}/>
        </Route>
      </Routes>
      

    </>
  );
}

export default App;
