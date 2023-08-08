import './App.css'
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'


function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Navbar/>}>
          <Route path='/posts' element={<div>posts</div>}/>
          <Route path='/login' element={<div>login</div>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
