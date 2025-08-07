import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import IndexPage from './pages/index/IndexPage'
import Navbar from './components/NavBar/Navbar'



function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path = "/" element={<IndexPage/>}/>
      </Routes>
    </BrowserRouter>
      
      
    </>
  )
}

export default App
